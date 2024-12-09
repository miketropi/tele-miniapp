export default function Modal({ heading, children, active, onClose }) {
  return <div className={ ['modal-container', (active ? '__is-open' : '')].join(' ') }>
    <div className="modal-inner">
      <div className="modal-heading">
        <h4>{ heading }</h4>
        <a href="#close" onClick={ e => {
          e.preventDefault();
          onClose();
        } }>Close</a>
      </div>
      <div className="modal-body">
        { children }
      </div>
    </div>
  </div>
}