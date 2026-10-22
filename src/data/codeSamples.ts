// 프로젝트 상세 페이지의 "핵심 코드" 섹션.
// 실제 작성한 코드에서 발췌했고, 클래스명·전문코드·테이블·프로시저·서버 정보 등 회사 식별값은 일반 이름으로 바꿨다.
// 로직과 흐름은 원본 그대로 둔다.

export interface CodeSample {
  title: string;
  /** 이 코드가 왜 필요했고 무엇을 하는지 */
  description: string[];
  lang: 'java' | 'xml' | 'bash' | 'text';
  code: string;
}

export const codeSamples: Record<string, CodeSample[]> = {
  'spring-batch-automation': [
    {
      title: '선행 파일 검증 Tasklet',
      description: [
        '19개 Job 중 후처리 Job 하나입니다. 카드사 제공 파일 15종이 오늘 모두 적재됐는지 먼저 확인하고, 빠진 파일은 하나씩 실패시키지 않고 모두 모아서 한 번에 알려 줍니다.',
        '검증을 통과하면 업무 프로시저를 호출하고, OUT 파라미터로 받은 오류 코드가 0이 아니면 실패 사유를 Job 결과로 남겨 JobPass에서 재실행 여부를 판단할 수 있게 했습니다.',
      ],
      lang: 'java',
      code: `public class FilePostProcessTasklet extends AbstractBatchTasklet {

    private static final String APPLY_LOG_COUNT_QUERY_ID = "FilePostProcess.selectApplyLogCount";
    private static final String PROCEDURE_QUERY_ID       = "FilePostProcess.callPostProcess";

    /** { 수신 파일 코드, 적재 대상 } — 실제로는 15종 */
    private static final String[][] APPLY_TARGETS = {
        { "FILE_01", "STG_TABLE_01" },
        { "FILE_02", "STG_TABLE_02" },
        // ...
    };

    @Override
    @Transactional
    public RepeatStatus execute(MapDto mapParameters) throws Exception {
        Map<String, Object> source = mapParameters.getSource();

        // 1) 기준일자 형식 검증
        String procDt = (String) source.get("PROC_DT");
        if (procDt == null || !procDt.matches("\\\\d{8}")) {
            throw new IllegalArgumentException("PROC_DT는 YYYYMMDD 형식이어야 합니다.");
        }
        String workDt = LocalDate.parse(procDt, DateTimeFormatter.BASIC_ISO_DATE)
                .minusDays(1).format(DateTimeFormatter.BASIC_ISO_DATE);

        // 2) 선행 파일 수신 여부 검증 — 빠진 파일을 모두 모아서 한 번에 실패
        List<String> missingTargets = new ArrayList<>();
        for (String[] target : APPLY_TARGETS) {
            source.put("V_FILE_CODE", target[0]);
            int applyLogCount = commonMapper.selectOne(APPLY_LOG_COUNT_QUERY_ID, source);
            if (applyLogCount < 1) {
                missingTargets.add(target[0] + " → " + target[1] + " 미적재");
            }
        }
        if (!missingTargets.isEmpty()) {
            throw new IllegalStateException("다음 대상의 적재가 확인되지 않았습니다. " + missingTargets);
        }

        // 3) 업무 프로시저 호출 (OUT 파라미터로 결과 수신)
        source.put("P_STDDATE", workDt);
        source.put("P_ERRCODE", -1);
        source.put("P_MSG", "");
        commonMapper.update(PROCEDURE_QUERY_ID, source);

        // 4) 오류 코드 확인 → 실패 사유를 Job 결과로 남김
        String errCode = String.valueOf(source.get("P_ERRCODE"));
        String message = source.get("P_MSG") == null ? "" : String.valueOf(source.get("P_MSG"));
        if (!"0".equals(errCode)) {
            throw new IllegalStateException("프로시저 처리 실패 [ERRCODE=" + errCode + "] " + message);
        }
        setJobResultMessage(message.isEmpty() ? "후처리 작업이 완료되었습니다." : message);
        return RepeatStatus.FINISHED;
    }
}`,
    },
    {
      title: '수신 확인 쿼리와 프로시저 호출 (MyBatis)',
      description: [
        '파일 연계 로그에서 오늘 날짜로 적재에 성공한 기록이 있는지 셉니다. 프로시저는 CALLABLE로 호출하고 오류 코드와 메시지를 OUT 파라미터로 돌려받습니다.',
      ],
      lang: 'xml',
      code: `<select id="selectApplyLogCount" parameterType="map" resultType="int">
    SELECT COUNT(*)
      FROM FILE_TRANSFER_LOG
     WHERE JOB    = #{V_FILE_CODE}
       AND "TYPE" = 'A'
       AND "DAY"  = TO_CHAR(SYSDATE, 'YYYYMMDD')
       AND RESULT = 'success'
</select>

<update id="callPostProcess" statementType="CALLABLE" timeout="300">
    { CALL PKG_BATCH.P_POST_PROCESS (
        #{P_STDDATE, mode=IN,  jdbcType=VARCHAR},
        #{P_ERRCODE, mode=OUT, jdbcType=NUMERIC},
        #{P_MSG,     mode=OUT, jdbcType=VARCHAR} ) }
</update>`,
    },
  ],

  'external-data-intake': [
    {
      title: '문제: 항목 안 줄바꿈 때문에 레코드가 쪼개짐',
      description: [
        '카드사 제공 파일 중 자유 기재 항목에 줄바꿈이 들어 있는 파일이 있었습니다. 줄 단위로 읽으면 레코드 하나가 여러 줄로 쪼개져 항목 수가 맞지 않고 적재 오류가 났습니다.',
        '한 레코드의 구분자 개수는 항상 "항목 수 − 1"이므로, 줄바꿈이 아니라 구분자 개수로 레코드 경계를 판단하도록 바꿨습니다.',
      ],
      lang: 'text',
      code: `파일 원문 (항목 4개, 구분자 |)
  1001|홍길동|연락 요청 메모 첫 줄
  메모 둘째 줄|20260812
  1002|김철수|메모 없음|20260812

줄 단위로 읽으면            → 3개 레코드 (1행: 항목 3개 ✗, 2행: 항목 2개 ✗, 3행 ✓)
구분자 3개를 셀 때까지 읽으면 → 2개 레코드
  1001|홍길동|연락 요청 메모 첫 줄 메모 둘째 줄|20260812   ✓
  1002|김철수|메모 없음|20260812                          ✓`,
    },
    {
      title: '구분자 개수로 레코드를 읽는 파서',
      description: [
        '파일 레이아웃 클래스에 어노테이션을 붙여 읽기 방식을 고릅니다. 고정길이(바이트), 구분자 개수, 일반 줄 단위 중 하나를 생성 시점에 정하므로 기존 파일들의 처리 방식은 그대로 둔 채 새 방식을 추가할 수 있었습니다.',
        '여러 바이트로 된 구분자도 처리하도록 부분 일치 위치를 따라가며 세고, 항목 안 줄바꿈은 공백으로 바꿉니다. 건수 검증에 쓰는 줄 수 계산도 같은 규칙으로 맞췄습니다.',
      ],
      lang: 'java',
      code: `// 파일 레이아웃 클래스에 붙이는 표시용 어노테이션
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface NeedDividerRead { }

// 적재기 생성 시 레이아웃에 맞는 읽기 전략 선택
mReadByDivider = diversions.getBodyClass().isAnnotationPresent(NeedDividerRead.class);
if (diversions.getBodyClass().isAnnotationPresent(NeedByteRead.class))
    mReadlineFunc = this::readLineByLenOfBytes;      // 고정길이(바이트) 레코드
else if (mReadByDivider) {
    mBodyOneRowDividerCount = Math.max(0, diversions.getBodyUnitCount() - 1);
    mBodyDividerBytes = diversions.getBodyDivider()
            .getBytes(Charset.forName(diversions.getBodyEncoding()));
    mReadlineFunc = this::readLineByDivider;         // 구분자 개수로 레코드 경계 판단
}
else
    mReadlineFunc = this::readLineByNewLineChar;     // 일반 줄 단위

private byte[] readLineByDivider(FileInputStream fis) throws Exception {
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    int dividerCount = 0;
    int matchIdx = 0;                                 // 여러 바이트 구분자의 부분 일치 위치

    int c;
    while ((c = fis.read()) != -1) {
        if (c == 0 || c == '\\r') continue;
        if (c == '\\n') {
            if (dividerCount >= mBodyOneRowDividerCount) break;  // 구분자를 다 셌으면 레코드 끝
            if (os.size() > 0) os.write(' ');                    // 항목 안 줄바꿈은 공백으로
            continue;
        }
        os.write(c);

        if (c == (mBodyDividerBytes[matchIdx] & 0xff)) {
            if (++matchIdx == mBodyDividerBytes.length) { dividerCount++; matchIdx = 0; }
        } else {
            matchIdx = (c == (mBodyDividerBytes[0] & 0xff)) ? 1 : 0;
        }
    }
    byte[] b = os.toByteArray();
    if (b.length > 0 && dividerCount < mBodyOneRowDividerCount) {
        log.warn("incomplete row. expected dividers={}, actual={}",
                mBodyOneRowDividerCount, dividerCount);
    }
    return b;
}`,
    },
  ],

  'safe-production-deploy': [
    {
      title: 'dry-run으로 배포 후보 추출',
      description: [
        '실제로 반영하기 전에 rsync dry-run 결과에서 바뀔 파일과 지워질 파일만 뽑아 번호 목록으로 보여 줍니다. 운영자는 이 목록에서 필요한 파일만 골라 배포합니다.',
      ],
      lang: 'bash',
      code: `DRY_RUN_OUTPUT=$(rsync -av --delete --dry-run --itemize-changes \\
  --include='*/' --include="$INC1" \${INC2:+--include="$INC2"} --exclude='*' \\
  "$SRC" "$DST")

CHANGED_FILES=$(echo "$DRY_RUN_OUTPUT" \\
  | awk -v r1="$REGEX1" '{p=$NF} (p ~ r1) {print p}' | sort -u)
DELETING_FILES=$(echo "$DRY_RUN_OUTPUT" \\
  | awk '/^\\*deleting/ {print $NF}' | sort -u)`,
    },
    {
      title: '원격 백업과 검증',
      description: [
        '대상 서버에서 실행되는 부분입니다. 운영에 이미 있는 파일만 경로를 유지한 채 백업하고, 백업본이 실제로 생겼는지 하나씩 확인합니다. 하나라도 실패하면 배포를 중단합니다. 운영에 없던 신규 파일은 따로 표시합니다.',
      ],
      lang: 'bash',
      code: `while IFS= read -r rel; do
  total=$((total+1))
  if [ ! -f "$rel" ]; then              # 운영에 없던 신규 파일은 백업 대상 아님
    echo "[NEW_FILE] $rel"; new_skipped=$((new_skipped+1)); continue
  fi
  cp --parents -p -- "$rel" "$BKP"/
  copied=$((copied+1))
  [ -f "$BKP/$rel" ] || {
    echo "[ERROR] Verify failed: $BKP/$rel"; verify_fail=$((verify_fail+1)); }
done <<'__FILE_LIST__'
$cleaned
__FILE_LIST__

echo "[INFO] Backup summary: copied=\${copied}/\${total}, new_skipped=\${new_skipped}, verify_fail=\${verify_fail}"
[ "$verify_fail" -eq 0 ] || { echo "[ERROR] Backup failed. Stop deploy."; exit 1; }`,
    },
    {
      title: '다단계 안전장치',
      description: [
        '허용된 접속 IP 대역에서만 실행되고, 환경명을 직접 입력해야 진행됩니다. 삭제가 포함된 전체 동기화는 DELETE를 한 번 더 입력해야 합니다.',
      ],
      lang: 'bash',
      code: `case "$EXEC_IP" in
  10.0.3.*) : ;;                                  # 허용 대역 (실제 값은 비공개)
  *) echo "허용되지 않은 접속 IP: $EXEC_IP"; exit 1 ;;
esac

read -p "Type '\${ENV_NAME}' to continue: " CONFIRM
[[ "$ENV_NAME" == "$CONFIRM" ]] || exit 1

if [ "$TOTAL_DEL" -gt 0 ]; then
  read -p "Type 'DELETE' to continue: " DEL_CONFIRM
  [ "$DEL_CONFIRM" = "DELETE" ] || exit 0
fi`,
    },
  ],
};
