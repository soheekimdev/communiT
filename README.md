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
