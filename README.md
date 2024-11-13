# 오즈코딩스쿨 심화반 프로젝트 템플릿

## 프로젝트 소개

- 프로젝트 명: 커뮤니'**T**'
- 팀원: [김소희](https://github.com/soheekimdev), [권여진](https://github.com/Kwonyeojiny), [주민재](https://github.com/Ju-MINJAE)
- 프로젝트 개요: (추후 작성)
- 기술 스택: (추후 작성)

## 프로젝트 기술 스택

- Framework/Library: React
- Dev Runtime: Node.js
- Bundler: Vite
- Language: TypeScript
- Routing: React Router
- State Management: Redux
- Styling: tailwindcss, shadcn
- HTTP Client: Axios
- Unit Test: (추후 작성)

## 메뉴 구조

- 챌린지 페이지

  - 챌린지 목록
  - 챌린지 상세
  - 챌린지 생성, 수정
  - 챌린지 참여

- 게시물 페이지
  - 게시물 목록
  - 게시물 상세
    - 댓글 목록
    - 댓글 작성, 수정, 삭제
    - 댓글 추천
  - 게시물 작성, 수정
- 메세지 페이지 (확정 X)

  - 메세지 리스트 목록
  - 메세지 채널 참가자

- 사용자 페이지

  - 프로필
  - 프로필 수정
  - 차단한 유저 관리
  - 내 챌린지 목록
  - 내가 쓴 글 목록
  - 로그아웃

- 로그인/회원가입 페이지
  - 이메일 찾기
  - 비밀번호 찾기
  - 비밀번호 재설정
- 알림 목록
- 설정 페이지
  - 알림 설정
  - 테마 설정

## 배포

- 배포 환경 : Vercel
- 배포 방법 : Vercel CI/CD를 통한 자동 배포
- CI/CD : GitHub Actions를 통해 Vercel로 자동 배포 설정
- 배포 주소:
  - [권여진](https://advanced-class-project-yeojin.vercel.app/)
  - [주민재](https://advanced-class-project.vercel.app/)
  - [김소희](https://advanced-class-project-team-b-seven.vercel.app/)

## 개발 방법

- 사용 가능한 Editor / IDE : VSCode
- 개발 환경 설정 방법: (추후 작성)
- 로컬 개발 방법: (추후 작성)
- PR 방법: (추후 작성)
- Issue 관리 방법: (추후 작성)
- 커밋 메시지 규칙:
  커밋 유형 | 의미
  -- | --
  Feat | 새로운 기능 추가
  Fix | 버그 수정
  Docs | 문서 수정
  Style | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
  Refactor | 코드 리팩토링
  Test | 테스트 코드, 리팩토링 테스트 코드 추가
  Chore | 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
  Design | CSS 등 사용자 UI 디자인 변경
  Comment | 필요한 주석 추가 및 변경
  Rename | 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
  Remove or Delete | 파일을 삭제하는 작업만 수행한 경우
  !BREAKING CHANGE | 커다란 API 변경의 경우
  !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우

## ChangeLog

<details>
<summary><strong>3주차(11/06 - 11/12)</strong></summary>
<br>

<details>  
<summary><strong>[차단 관리][공통 레이아웃] 김소희</strong></summary>
  
### ✅ Done
<hr>

- 차단 유저 관리 UI/UX 디자인
  - 사용자 경험을 고려한 레이아웃 설계
  - 차단된 사용자 목록 표시 및 차단 해제 버튼 구현
  - 차단 해제 버튼 클릭 시 Toast 알림을 통한 사용자 피드백 제공

- RTK를 활용한 상태 관리 구조 개선
  - Redux Thunk를 사용한 비동기 액션 처리
  - 로그인 시 토큰 로컬 스토리지 저장 기능 구현

- Layout 컴포넌트 구조 개선
  - Providers, Routes, Layout 컴포넌트 분리 및 리팩토링
    - main.tsx: 전역 상태 및 테마 관리
    - App.tsx: 라우팅 로직 분리
    - Layout.tsx: 공통 UI 구조 관리

- 사이드바 구조 개선
  - 로그인/로그아웃 버튼을 subMenuItems에서 분리하여 독립적으로 렌더링
  - 사용자 경험 및 유지보수성 향상

- 컴포넌트 개선
  - Avatar 컴포넌트에 새로운 size 옵션 추가
    - 다양한 사용 컨텍스트 지원

### ⚙️ in Progress

<hr>

- 챌린지 UI/UX 디자인
  - 챌린지 목록 구현
  - 챌린지 상세 화면 구현
 
### 🖼️ Preview
<hr>

<div align=center>
  ![스크린샷 2024-11-13 오후 6 33 01](https://github.com/user-attachments/assets/0abf9b6a-9ef7-46fc-afd7-509d7da4bb8f)
  ![스크린샷 2024-11-13 오후 6 33 17](https://github.com/user-attachments/assets/e903ab94-d1d6-4afd-84f8-817e12061359)
</div>

</details>
</details>

<details>
<summary><strong>2주차(10/30 - 11/05)</strong></summary>
<br>

<details>  
<summary><strong>[알림설정] 김소희</strong></summary>
  
  ### ✅ Done
  <hr>
  
  - 알림 설정 UI/UX 디자인
    - 사용자 인터페이스 설계
    - 보여줄 정보와 알림 설정 방법 확정

  - 알림 설정 폼 컴포넌트 구현

### ⚙️ in Progress

  <hr>
  
  - 구현 중인 내용

    - 차단 유저 관리 UI/UX 디자인

    - 차단 유저 목록 표시 및 차단/해제 버튼 구현
   
  ### 🖼️ Preview
  <hr>

<div align=center>
  <img src="https://github.com/user-attachments/assets/25e1eb09-41ff-4153-a22b-9e8f09cebac3" width=400/>
</div>

  
</details>

<details>  
<summary><strong>[로그인/회원가입] 권여진</strong></summary>
  
  ### ✅ Done
  <hr>
  
  - 회원가입 페이지 디자인 및 폼 구현

  - 이메일 찾기 페이지 디자인 및 폼 구현

  - 로그인/회원가입 라우팅 설정

### ⚙️ in Progress

  <hr>
  
  - 구현 중인 내용

    - 로그인/로그아웃 분기처리

    - Redux Toolkit을 이용한 로그인 상태관리
   
    - 중복 컴포넌트 분리
   
  ### 🖼️ Preview
  <hr>

<div align=center>
  <img src='https://github.com/user-attachments/assets/1bfa2f4c-63f1-44d0-8828-4c63d067a88a' width=400/>
  <img src='https://github.com/user-attachments/assets/7c58aad1-a3f1-4e48-a57f-3df35257043a' width=400/>
  <img src='https://github.com/user-attachments/assets/fff49704-c363-46a9-aa0f-37ccd6b2c032' width=400/>
</div>
  
</details>

<details>
<summary><strong>[테마설정][비공개 계정 관리] 주민재</strong></summary>
  
  ### ✅ Done
  <hr>
  
  - 테마 설정 UI/UX 디자인

  - 테마 변경 기능 구현
    - 라이트 모드, 다크 모드, 사용자 설정
      
  - 비공개 계정 설정 UI/UX 디자인
    - 비공개 계정 활성화/비활성화 시 토스트 알림

 ### ⚙️ in Progress

  <hr>
  
  - 프로필 정보 수정
    
    - 아바타, 닉네임, 비밀번호, 카테고리 항목별 submit 버튼 추가 중 (개별 수정 가능)
  

### 🖼️ Preview

  <hr>

  <div align=center>
    <img src='https://github.com/user-attachments/assets/eae525b7-cc5d-42d8-975f-f5fd0c6c7602' width=400/>
    <img src='https://github.com/user-attachments/assets/c165de1b-018e-4aac-867b-f25ed81ba909' width=400/>
    <img src='https://github.com/user-attachments/assets/ab2e5209-33b5-4c78-aa48-b6e8240ba3c0' width=400/>
  </div>

</details>

</details>

<details>
<summary><strong>1주차(10/23 - 10/27)</strong></summary>
<br>
<details>
<summary><strong>[전체 메뉴 구현] 김소희</strong></summary>
  
  ### ✅ Done
  <hr>
  
  - 전체 사이트의 메뉴 구조 및 네비게이션 UI/UX 디자인
  
  - 헤더, 사이드바 컴포넌트 구현
  
  - 라우팅 구현

### 🖼️ Preview

  <hr>

  <div align=center>
    <img src='https://github.com/user-attachments/assets/92c81496-daf4-4b47-902f-8aa2d3b67414' width=500/>
  </div>

</details>

<details>
<summary><strong>[로그인/회원가입] 권여진</strong></summary>
  
  ### ✅ Done
  <hr>
  
  - 로그인 UI/UX 디자인
  
  - 로그인 폼 컴포넌트 구현
    
  - 비밀번호 찾기 페이지 디자인 및 폼 구현

### 🖼️ Preview

  <hr>

  <div align=center>
    <img src='https://github.com/user-attachments/assets/9d25bc4a-40f9-454d-8c91-93a7aaaad64c' width=400/>
    <img src='https://github.com/user-attachments/assets/b8fc6f17-f873-4e82-82ba-e293a1617509' width=400/>
  </div>

</details>

<details>
<summary><strong>[프로필] 주민재</strong></summary>
  
  ### ✅ Done
  <hr>
  
  - 프로필 UI/UX 디자인
  
  - 프로필 수정 폼 컴포넌트 구현

### 🖼️ Preview

  <hr>

  <div align=center>
    <img src='https://github.com/user-attachments/assets/74409d35-f148-460f-ba6b-ed39106d7274' width=400/>
    <img src='https://github.com/user-attachments/assets/b6321eec-f517-4d8d-bc4d-b3466e117369' width=400/>
  </div>

</details>

</details>

<hr>

<details>  
<summary><strong>작성예시</strong></summary>
  
  ### ✅ Done
  <hr>
  - 구현 내용

### ⚙️ in Progress

  <hr>
  
  - 구현 중인 내용
    - 세부사항
    - 세부사항
        
  ### 📚 Next
  <hr>
  
  - 구현 예정
    - 세부사항
    - 세부사항
   
  ### 🖼️ Preview
  <hr>
  ![사진이름](사진URL)
</details>
