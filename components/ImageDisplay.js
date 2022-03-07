export  const  ImageDisplay=(props)=>{
const {imageUrl,onClose}  = props;

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Image fluid={true} src={imageUrl}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}