import React, {useState, useEffect} from 'react';


function Nav(props) {
  
  let listTag = [];
  for(let i=0; i<props.list.length; i++){
      let li = props.list[i];
      listTag.push(
      <li key={li.id}>
        <a href={li.id} data-id={li.id} onClick={(e)=> {
          e.preventDefault();
          props.onCLick(e.target.dataset.id);
        }}>
          {li.title}
        </a>
      </li>)
  }
  
  return (
      <nav>
        <ul>
          {listTag}
        </ul>
      </nav>
  );
}



function Article(props) {
    return (
    <article>
        <h2>{props.title}</h2>
        {props.desc}
    </article>
  );
}



function NowLoading (props) {
    return (
      <div>Now Loading ...</div>
    );
}



function App() {
  const[article, setArticle] = useState(
    {
      item:{title:'Welcome', desc:'Hello, React & Ajax'},
      isLoading:false
    }
  );

  const [list, setList] = useState(
    {
      items:[],
      isLoading:false
    }
  );

  useEffect(
    () => {
      let newList = Object.assign({}, list, {isLoading:true});
      setList(newList);
      fetch('list.json').then((result) =>
        result.json()
      ).then((json) => {
        setList({
          items:json,
          isLoading:false
        })
      })
    },[]
  )

  let NavTag = null;
  if(list.isLoading) {
    NavTag = <NowLoading></NowLoading>
  } else{
      NavTag = <Nav list={list.items} onCLick={(id)=> {
        let newArticle = Object.assign({}, article, {isLoading:true});
        setArticle(newArticle);
        fetch(id+'.json').then((res)=> 
        res.json()
        ).then((json) => {
          setArticle({
            item:{title:json.title, desc:json.desc},
            isLoading:false
          })
        })
      }
    }
    ></Nav>
  }

  let ArticleTag = null;
  if(article.isLoading) {
    ArticleTag = <NowLoading></NowLoading>;
  } else {
    ArticleTag = <Article title={article.item.title} desc={article.item.desc}></Article>;
  }

  return (
    <div className="App">
      <h1>WEB</h1>
      {NavTag}
      {ArticleTag}
    </div>
  );
}

export default App;
