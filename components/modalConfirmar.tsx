const ModalConfirmar = ({ isOpen, onClose, children }:{isOpen: boolean; onClose: () => void; children:any}) => {
  
    return(
        <div className="modal-container" style={{ display: isOpen ? 'grid' : 'none'}}>
           <div className='modal-body'>
              <button className='modal-close' onClick={onClose}>X</button> 
              {children}
           </div>
        </div>
   );
 }
 
 export default ModalConfirmar;