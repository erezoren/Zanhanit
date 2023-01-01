import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {getAllContent} from "../lib/protocolesHandler";
import {BLOCKS, MARKS} from '@contentful/rich-text-types';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

export async function getServerSideProps(context) {
  return {
    props: {
      allProtocols: await getAllContent()
    },
  }
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

export default function Protocols(props) {
  debugger
  const {allProtocols} = props;

  return (
      <div className={styles.container}>
        <Header/>
        <div style={{direction: "rtl"}}>
          {documentToReactComponents(allProtocols[0].fields.closingThePub, options)}
        </div>
        <hr/>
        <div style={{direction: "rtl"}}>
          {documentToReactComponents(allProtocols[2].fields.closingThePub, options)}
        </div>
      </div>
  )
}

//{{/*documentToReactComponents(all[0], options)*/}}
//traverseContent(all[0].fields.closingThePub.content,[])