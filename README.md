# 교수 연구 포트폴리오 웹사이트

교육학과 교수의 연구, 수업 자료, 소개를 보여 주는 웹사이트입니다.
지금은 데이터베이스 없이 동작하며, 나중에 Firebase(무료 Spark 요금제)의 Firestore와 Google 로그인을 붙일 수 있게 만들어 두었습니다.

---

## 1. 내 컴퓨터에서 실행해 보기

1. [Node.js](https://nodejs.org/) 홈페이지에서 **LTS 버전(20 이상)** 을 내려받아 설치합니다.
2. 이 폴더에서 터미널(맥: 터미널 / 윈도우: 명령 프롬프트)을 엽니다.
3. 처음 한 번만 아래 명령으로 필요한 프로그램을 설치합니다.
   ```bash
   npm install
   ```
4. 아래 명령을 입력하면 사이트가 실행됩니다.
   ```bash
   npm run dev
   ```
5. 화면에 나온 주소(보통 `http://localhost:5173`)를 인터넷 브라우저에서 엽니다.
6. 끝내려면 터미널에서 `Ctrl + C` 를 누릅니다.

---

## 2. 내용 수정하는 곳 (이 3개 파일만 고치면 됩니다)

| 바꾸고 싶은 내용 | 파일 |
| --- | --- |
| 이름, 소속, 소개, 학력, 경력, 이메일, 연구 분야 | `src/data/profile.ts` |
| 연구 목록 | `src/data/research.ts` |
| 수업 자료 목록 | `src/data/teaching.ts` |

수정 요령:
1. **따옴표(" ") 안의 글자만** 바꾸세요. 쉼표(,)와 괄호는 지우지 않도록 주의합니다.
2. 항목을 추가하려면 `{` 부터 `},` 까지 한 묶음을 복사해 바로 아래에 붙여 넣고 내용을 고칩니다.
3. 연구의 `id` 는 서로 겹치지 않게 적습니다(예: `r7`). 주소(`/research/r7`)에 쓰입니다.
4. 연구 상태는 `"진행중"` 또는 `"완료"`, 수업 자료 유형은 `"강의안"`, `"참고문헌"`, `"과제"`, `"기타"` 중 하나만 쓸 수 있습니다.
5. 논문·자료 파일은 올리지 않고 Google Drive, DOI, KCI, RISS 등의 **링크**만 적습니다.
6. 홈 화면의 "대표 연구"는 `research.ts` 맨 앞의 3건, "최근 수업 자료"는 등록일(`createdAt`)이 가장 최근인 3건입니다.

GitHub 웹사이트에서 파일을 열고 연필 모양(Edit) 버튼으로 바로 고쳐도 됩니다. 저장(Commit changes)하면 Netlify가 자동으로 사이트를 다시 만듭니다.

---

## 3. GitHub에 올리기

1. [GitHub](https://github.com/)에 가입하고 로그인합니다.
2. 오른쪽 위 **+** → **New repository** 를 누르고 저장소 이름을 정한 뒤 **Create repository** 를 누릅니다.
3. 이 폴더에서 터미널을 열고 아래 명령을 차례로 입력합니다. (`내아이디/저장소이름` 부분은 본인 것으로 바꿉니다)
   ```bash
   git init
   ```
   ```bash
   git add .
   ```
   ```bash
   git commit -m "첫 업로드"
   ```
   ```bash
   git branch -M main
   ```
   ```bash
   git remote add origin https://github.com/내아이디/저장소이름.git
   ```
   ```bash
   git push -u origin main
   ```
4. GitHub 저장소 화면을 새로 고쳐 파일이 올라갔는지 확인합니다.

> `.env` 파일(비밀 설정값)과 `node_modules`, `dist` 폴더는 자동으로 제외되어 올라가지 않습니다.

---

## 4. Netlify로 인터넷에 공개하기

1. [Netlify](https://www.netlify.com/)에 GitHub 계정으로 가입·로그인합니다.
2. **Add new site** → **Import an existing project** → **GitHub** 를 선택합니다.
3. 방금 올린 저장소를 고릅니다.
4. 설정값은 `netlify.toml` 파일에 이미 들어 있으므로 그대로 두고 **Deploy** 를 누릅니다.
   - 빌드 명령: `npm run build` / 게시 폴더: `dist` / Node 버전: 22
5. 1~2분 뒤 `https://무작위이름.netlify.app` 주소가 생깁니다. **Site configuration → Change site name** 에서 주소 앞부분을 바꿀 수 있습니다.
6. 이후 GitHub에 수정 내용이 올라가면 Netlify가 자동으로 다시 배포합니다.

> 어떤 페이지에서 새로 고침해도 404 오류가 나지 않도록 `netlify.toml` 에 설정해 두었습니다.

---

## 5. 다음 단계: Firebase 연동 (지금은 자리만 마련됨)

무료 Spark 요금제 기준으로 **Firestore(데이터)와 Google 로그인만** 사용합니다. Cloud Storage(파일 업로드)와 Cloud Functions는 사용하지 않습니다.

준비된 자리:
1. `src/lib/firebase.ts` — Firebase 초기화 위치
2. `src/services/researchService.ts`, `src/services/teachingService.ts` — 함수 안쪽만 Firestore 호출로 바꾸면 페이지는 그대로 동작
3. `src/context/AuthContext.tsx` — Google 로그인/로그아웃 자리
4. `.env.example` — Firebase 설정값 목록 (복사해서 `.env` 로 만들고 값 입력. Netlify에는 **Site configuration → Environment variables** 에 같은 이름으로 입력)

---

## 폴더 구조 (참고용)

```
src/
  data/       ← 내용 수정은 여기 3개 파일만
  types/      데이터 형식 정의 (Firestore 구조와 동일)
  services/   데이터를 가져오는 함수 (나중에 Firestore로 교체)
  context/    로그인 상태 (준비 중)
  lib/        공통 도구, Firebase 초기화 자리
  components/ 화면 조각 (헤더, 푸터, 카드 등)
  pages/      각 페이지
```
