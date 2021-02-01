# 이전 작업 
https://stackblitz.com/edit/react-step-2

# 알아야 할 것 
모든 컴포넌트는 props를 통해서만 데이터를 입력 받을 수 있습니다. 데이터의 흐름은 상위 컴포넌트에서 하위 컴포넌트를 통해서만 흐르밉니다. 이를 통해서 애플리케이션의 복잡도를 낮출 수 있습니다. 아래의 그림에서 props 부분을 이해해야 합니다. 

![](https://blog.kakaocdn.net/dn/rH4LA/btqF16Gn9C4/yUtBnxdij7DpdL7ySN6IQ0/img.png)

# 성취
재사용 가능하고, 커스터마이징 가능한 컴포넌트를 만들었습니다. 컴포넌트 함수의 파리미터(props)의 용법을 알게 되었습니다. 

# 불만족
HTML 태그 처럼 컴포넌트에도 이벤트를 설치해서 컴포넌트에서 발생하는 일에 따라서 자동화된 처리를 하고 싶습니다. 

# 도약
아래와 같은 인터페이스를 가지고 있는 컴포넌트를 만들어보세요. 
```
<Header onChangeMode={function(){
  // 웰컴 페이지가 article 영역에 노출됩니다. 
}}>
<Nav={[
  {id:1, title:'html', description:'html is...'},
  {id:2, title:'css', description:'css is...'},
  {id:3, title:'js', description:'js is...'}
]} onChangeMode={function(topic_id){
  // topic_id에 해당하는 토픽이 article 영역에 노출됩니다. 
}}>
```