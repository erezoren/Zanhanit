import styles from '../styles/Home.module.css'
import {Header} from "../components/common/Header";
import {getAllContent} from "../lib/protocolesHandler";
import {BLOCKS, INLINES, MARKS} from '@contentful/rich-text-types';
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
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "blogPost") {
          return (
              <a href={`/blog/${node.data.target.fields.slug}`}>            {node.data.target.fields.title}
              </a>
          );
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "codeBlock") {
          return (
              <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
          );
        }

        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
              <iframe
                  src={node.data.target.fields.embedUrl}
                  height="100%"
                  width="100%"
                  frameBorder="0"
                  scrolling="no"
                  title={node.data.target.fields.title}
                  allowFullScreen={true}
              />
          );
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
            <img
                src={`https://${node.data.target.fields.file.url}`}
                height={node.data.target.fields.file.details.image.height}
                width={node.data.target.fields.file.details.image.width}
                alt={node.data.target.fields.description}
            />
        );
      },
    },
  },
};

export default function Protocols(props) {
  debugger
  const {allProtocols} = props;

  return (
      <div className={styles.container}>
        <Header/>
        <div style={{direction: "rtl"}}>
          {documentToReactComponents(allProtocols[0].fields.protocoles, options)}
        </div>
        <hr/>
        <div style={{direction: "rtl"}}>
          {documentToReactComponents(allProtocols[1].fields.body, options)}
        </div>
        <hr/>
        <div style={{direction: "rtl"}}>
          {documentToReactComponents(allProtocols[2].fields.protocoles, options)}
        </div>
      </div>
  )
}

//{{/*documentToReactComponents(all[0], options)*/}}
//traverseContent(all[0].fields.closingThePub.content,[])