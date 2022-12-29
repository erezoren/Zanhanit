import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {getAllContent} from "../lib/protocolesHandler";
import {BLOCKS, MARKS} from '@contentful/rich-text-types';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

export async function getServerSideProps(context) {
  return {
    props: {
      all: await getAllContent()
    },
  }
}

const traverseContent = (all, content_arr) => {
  if (all == undefined) {
    return;
  }
  all.forEach(item => {
    content_arr.push(<div>{item.nodeType}</div>)
    traverseContent(item.content, content_arr)
  })
  return content_arr;

}

const Bold = ({children}) => <span className="bold">{children}</span>;

const Text = ({children}) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
};

const richTextDocument = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Hello',
          data: {},
          marks: [{type: 'bold'}],
        },
        {
          nodeType: 'text',
          value: ' world!',
          data: {},
          marks: [{type: 'italic'}],
        },
      ],
    },
  ],
};
export default function Protocols(props) {
  debugger
  const {all} = props;

  return (
      <div className={styles.container}>
        <Header/>
        <div style={{direction: "rtl"}}>
          {documentToReactComponents(all[0].fields.closingThePub, options)}
        </div>
        <hr/>
        <div style={{direction: "rtl"}}>
          {documentToReactComponents(all[2].fields.closingThePub, options)}
        </div>
      </div>
  )
}

//{{/*documentToReactComponents(all[0], options)*/}}
//traverseContent(all[0].fields.closingThePub.content,[])