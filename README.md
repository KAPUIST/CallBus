### 커뮤니티 리스트 페이지를 다음과 같이 구현합니다.

- [x] route는 `/community/list` 입니다.
- [x] 디자인은 피그마의 `커뮤니티_홈` 과 최대한 똑같이 구현하여 주세요.
- 카테고리는 다음과 같이 구현합니다.
  - [x] 좌우 슬라이드가 가능해야 합니다.
  - [x] 카테고리에 따라 해당 카테고리의 글로 필터링 되어야 합니다.
  - [x] 인기글은 조회수가 100이 넘는 글만 보여줍니다.
- 리스트 아이템은 다음과 같이 구현합니다.
  - [x] 작성 시간은 현 시간과 작성 시간의 차이가 1분 미만일 때는 `방금 전`, 1분 이상 1시간 미만일 때는 `m분전` , 1시간 이상 24시간 미만일 때는 `h시간 전` , 그 이상일 때는 ㄹ 의 형태로 나타냅니다.
  - [x] 글 제목은 1줄, 글 내용은 최대 2줄까지 보여 줍니다.
  - [x] 데이터에 `imageUrl`이 있을 시엔 이미지를 보여주며, 이미지 높이는 160px 고정입니다.
- [ ] 글 상세나 글 작성 페이지로 갔다가 돌아왔을 때, 이전의 스크롤 높이가 유지되어야 합니다.
- [x] (+ 추가) 리스트 페이지의 우측 하단에 글쓰기 버튼을 만들어주세요.

### 커뮤니티 디테일을 다음과 같이 구현합니다.

- [x] route는 `/community/post/:post_pk`입니다.
  - [x] 디자인은 피그마의 `커뮤니티_디테일` 과 최대한 똑같이 구현하여 주세요.
  - [x] 글 내용에 링크가 있다면 링크가 클릭 되어야 합니다.
  - [ ] 좋아요 버튼이 작동해야 합니다.
  - [ ] 좋아요 상태가 유지되어야합니다.
  - [x] 글상세를 보는 경우 viewCount가 올라가며 유지되어야 합니다.
  - [x] 사진이 있는 경우, 글 바로 밑에 보여 줍니다.
  - [ ] 사진이 여러장인 경우, 위에서부터 차례대로 보여 줍니다.

## 커뮤니티 글쓰기를 다음과 같이 구현합니다.

- [x] route는 `/community/post/new` 입니다.
  - [x] 디자인은 피그마의 `커뮤니티_글작성` 과 최대한 똑같이 구현하여 주세요.
  - [ ] 이미지 업로드는 다음과 같이 구현합니다.
    - [ ] 좌우로 슬라이드가 가능해야 합니다.
    - [ ]삭제가 가능해야 합니다.
    - [ ]`multiple upload`가 가능해야 합니다.
  - [x] 완료 버튼은 필수 값들이 모두 유효할 때 활성화 되어야 합니다.
  - [x] 완료 버튼 클릭시 새로운 글이 추가되면서 리스트 화면으로 이동합니다.
  - [x] 상단 뒤로가기 클릭시 뒤로이동합니다.
