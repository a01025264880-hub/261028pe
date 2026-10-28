# 인앤에듀 — 교수 연구 포트폴리오 웹사이트

교육학과 교수의 연구, 수업 자료, 소개를 보여 주는 웹사이트입니다.
연구·수업 자료는 Firebase(무료 Spark 요금제)의 Firestore에 저장되고, 관리자는 Google 로그인 후 [관리] 화면에서 바로 추가·수정·삭제합니다.

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

## 2. 내용 수정하는 곳

| 바꾸고 싶은 내용 | 수정 방법 |
| --- | --- |
| 연구 목록 | 사이트에서 관리자 계정으로 로그인 → 상단 **[관리]** → [연구] 탭 |
| 수업 자료 | 사이트에서 관리자 계정으로 로그인 → 상단 **[관리]** → [수업 자료] 탭 |
| 사이트 이름(인앤에듀)·한 줄 설명, 교수 이름, 소속, 소개, 학력, 경력, 이메일, 연구 분야 | 파일 `src/data/profile.ts` |
| 관리자 계정(이메일) | 파일 `src/lib/admin.ts` **와** `firestore.rules` 두 곳 모두 (아래 5장 참고) |

1. [관리] 화면에서 저장하면 **사이트에 바로 반영**됩니다. GitHub·Netlify를 거치지 않습니다.
2. 논문·자료 파일은 올리지 않고 Google Drive, DOI, KCI, RISS 등의 **링크**만 적습니다.
3. 홈 화면의 "대표 연구"는 연도가 가장 최근인 3건, "최근 수업 자료"는 등록일이 가장 최근인 3건입니다.
4. `profile.ts` 는 **따옴표(" ") 안의 글자만** 바꾸세요. GitHub 웹사이트에서 파일을 열고 연필(Edit) 버튼으로 고친 뒤 Commit changes 를 누르면 Netlify가 자동으로 다시 배포합니다.

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

## 5. Firebase 설정 (처음 한 번만)

이 사이트는 무료 Spark 요금제의 **Firestore(데이터)와 Authentication(Google 로그인)만** 사용합니다. Cloud Storage, Cloud Functions는 쓰지 않습니다.
연결 정보는 `src/lib/firebase.ts` 에 들어 있습니다. (Firebase 웹 설정값은 공개되어도 되는 값이며, 데이터 보호는 보안 규칙이 담당합니다)

### 5-1. Firestore 데이터베이스 만들기
1. [Firebase 콘솔](https://console.firebase.google.com/) → 프로젝트 `claude-edu-bb854` 선택
2. 왼쪽 메뉴 **빌드 → Firestore Database** → **데이터베이스 만들기**
3. 위치는 `asia-northeast3 (서울)` 을 고르고, **프로덕션 모드**로 시작합니다. (위치는 나중에 바꿀 수 없습니다)

### 5-2. 보안 규칙 게시
1. Firestore Database 화면의 **규칙** 탭을 엽니다.
2. 이 저장소의 `firestore.rules` 파일 내용을 **전부 복사해 붙여 넣고** **게시**를 누릅니다.
3. 규칙 내용: 누구나 읽기 가능, 관리자 이메일 계정만 쓰기 가능

### 5-3. 로그인 도메인 확인
**Authentication → 설정 → 승인된 도메인**에 Netlify 주소(예: `내사이트.netlify.app`)가 있어야 그 주소에서 Google 로그인이 됩니다.

### 5-4. 샘플 데이터 넣기 (선택)
사이트에서 관리자 계정으로 로그인 → [관리] → 목록이 비어 있으면 **"샘플 6건 넣기"** 버튼이 보입니다. 누르면 예시 자료가 들어가며, 이후 수정·삭제하면 됩니다.

### 관리자 계정을 바꾸거나 추가하려면
1. `src/lib/admin.ts` 의 이메일 목록 수정
2. `firestore.rules` 의 `["..."]` 이메일 목록도 똑같이 수정
3. 바뀐 `firestore.rules` 내용을 Firebase 콘솔 규칙 탭에 다시 붙여 넣고 게시

---

## 폴더 구조 (참고용)

```
src/
  data/       profile.ts(교수 정보) + 처음 한 번 쓰는 샘플 데이터
  types/      데이터 형식 정의 (Firestore 구조와 동일)
  services/   Firestore에서 데이터를 읽고 쓰는 함수
  context/    Google 로그인 상태
  lib/        공통 도구, Firebase 연결(firebase.ts), 관리자 목록(admin.ts)
  components/ 화면 조각 (헤더, 푸터, 카드 등)
  pages/      각 페이지
```
