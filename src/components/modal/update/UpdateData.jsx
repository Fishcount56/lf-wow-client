import { Modal, Button } from 'react-bootstrap'

export default function UpdateData({ show, handleCloseUpdate, setConfirmUpdate }) {

    const handleUpdate = () => {
        setConfirmUpdate(true)
    }

    return (
        <Modal show={show} onHide={handleCloseUpdate} centered>
            <Modal.Body className="text-dark">
                <div style={{fontSize: '20px', fontWeight: '900'}}>
                    Update Data
                </div>
                <div style={{fontSize: '16px', fontWeight: '500'}} className="mt-2">
                    Are you sure you want to Update this data?
                </div>
                <div className="text-end mt-5">
                    <Button onClick={handleUpdate} size="sm" className="btn-success me-2" style={{width: '135px'}}>Yes</Button>
                    <Button onClick={handleCloseUpdate} size="sm" className="btn-danger" style={{width: '135px'}}>No</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}
