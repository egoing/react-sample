# 이전 작업 
https://stackblitz.com/edit/react-step-3

# 알아야 할 것 
1. 컴포넌트의 사용자가 이벤트 핸들러를 설치해서 컴포넌트와 상호작용 할 수 있도록 하는 방법을 이해해야 합니다. 
1. 부모 컴포넌트가 자식 컴포넌트로 데이터를 전달 할 때는 props를 사용합니다. 자식 컴포넌트가 부모 컴포넌트를 변경해야 하는 경우는 props를 통해서 전달한 이벤트 핸들러 함수를 호출하는 것으로 처리 합니다. 
1. 아래의 그림에서 props와 state의 관계를 이해할 수 있어야 합니다. 

![](https://blog.kakaocdn.net/dn/rH4LA/btqF16Gn9C4/yUtBnxdij7DpdL7ySN6IQ0/img.png)


# 성취
컴포넌트에 이벤트를 설치해서 상호작용하는 방법을 알았습니다. 

# 불만족
쓰기 기능을 구현하고 싶습니다. 

# 도약
아래와 같은 인터페이스를 가지고 있는 컴포넌트를 만들어보세요. 
```
<control onChangeMode={function(mode){
  // create, update, delete와 관련된 처리
}}></control>
```