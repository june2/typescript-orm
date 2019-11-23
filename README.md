### 문제해결 전략
- heroku 작업물 배포
  - https://danggun.herokuapp.com
  - 미국리전 반응속도느림
- ERD
![image](https://user-images.githubusercontent.com/5827617/69479541-b88af900-0e41-11ea-8983-76ef53988787.png)

### API 명세서
 - 카테고리 조회
    - ```
      GET /categories
      ```
 - 카테고리 별, 필터 조회
    - ```
      GET /filters/:categorId
      ```      
 - 상품 조회 (카테고리 별, 상품조회 / 필터조건 상품 조회)
    - ```
      GET /proucts      
      ```
 - 상품 등록 
    - ```
      post /proucts      
      ```

### 이슈 사항 
  - client
     - 테스트 코드 미작성
     - 필터 설정 (캐싱) 미적용
     - 상품 등록 후, 액션 처리 
     - 필터 component 리팩토링 필요
     - 상세페이지 옵션내용 관련 미구현
     - 금액 표시 미구현
  - server
     - 테스트 코드 미작성
     - 조건 검색 리팩토링 필요
     - 테이블 세부적으로 재설계 필요
