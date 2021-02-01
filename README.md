# 이전 작업 
https://stackblitz.com/edit/react-step-1?file=src/App.js

# 성취
컴포넌트를 만들 수 있게 되었습니다. 

# 불만족
컴포넌트가 너무 경직 되어 있습니다. HTML 태그 처럼 속성을 통해서 컴포넌트를 커스터마이징 하고 싶습니다. 

# 도약
아래와 같은 인터페이스를 가지고 있는 컴포넌트를 만들어보세요. 
```
<Nav
  data={[
    { id: 1, title: "html", description: "html is..." },
    { id: 2, title: "css", description: "css is..." },
    { id: 3, title: "js", description: "js is..." }
  ]}
/>
<Article title="제목" description="본문" />
```