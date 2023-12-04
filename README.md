# TOY STORY Fan Letter Box ver2💌

## 프로젝트 정보

![메인화면](https://file%252B.vscode-resource.vscode-cdn.net/var/folders/zd/3w5vcjg92_ng51phm10g2_c80000gn/T/TemporaryItems/NSIRD_screencaptureui_lWtATP/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202023-12-04%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB%252011.14.27.png?version%253D1701656086597)

- 개요 : Woody, Buzz, Forky, Bopeep 네 명의 캐릭터에게 팬레터를 작성할 수 있는 웹 페이지.
- 프로젝트 기간 : 23.11.30 ~ 23.12.4
- 배포 링크 : https://fan-letter-ver2.vercel.app/

## 사용 기술

- Language : JavaScript
- FrameWork : React
- Libaray : uuid, styled-component, redux, react-toastify, axios, json-server, react-router-dom

## 주요 기능

- 인증 서버를 활용한 로그인, 회원가입 기능 (로그인이 되어야 게시글 작성 및 열람 가능)
  ![로그인페이지](https://file%252B.vscode-resource.vscode-cdn.net/var/folders/zd/3w5vcjg92_ng51phm10g2_c80000gn/T/TemporaryItems/NSIRD_screencaptureui_UxPP1N/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202023-12-04%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB%252011.20.39.png?version%253D1701656446918)

- 게시글 CRUD 기능 (현재 로그인 한 유저와 게시글 작성 유저가 일치할 때만 수정 및 삭제 버튼 표시)
  ![상세페이지](https://file%252B.vscode-resource.vscode-cdn.net/var/folders/zd/3w5vcjg92_ng51phm10g2_c80000gn/T/TemporaryItems/NSIRD_screencaptureui_8ezMK7/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202023-12-04%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB%252011.21.50.png?version%253D1701656526381)

- 마이 프로필 확인 / 닉네임 및 아바타 변경 기능
  - 프로필 변경 시 내가 이전에 작성한 게시글의 닉네임 및 아바타도 모두 수정
    ![마이페이지](https://file%252B.vscode-resource.vscode-cdn.net/var/folders/zd/3w5vcjg92_ng51phm10g2_c80000gn/T/TemporaryItems/NSIRD_screencaptureui_QXSejS/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA%25202023-12-04%2520%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB%252011.23.45.png?version%253D1701656646042)
