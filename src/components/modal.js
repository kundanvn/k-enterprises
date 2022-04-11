import React from "react";
import ReactDOM from "react-dom";

/**
 * This is the Modal Component
 *
 * @param {boolean} show - Accepts a boolean value for enabling/disabling the modal (Required)
 * @param {array} children- Accepts array of elements to be shown inside the modal (Required)
 * @param {boolean} animation - Accepts a boolean value for enabling/disabling the animation of the modal
 * @param {boolean} autoFocus - Accepts a boolean value for shifting focus to the modal
 * @param {boolean} backdrop - Accepts a boolean value to include a backdrop component for the modal
 * @param {boolean} centered - Accepts a boolean value for vertically positioning the modal
 * @param {string} size - Accepts strings ('sm', 'lg', 'md', 'xl') for assigning the size of the modal
 * @param {boolean} scrollable - Accepts a boolean value for making the modal scrollable
 * @param {func} onShow - Accepts a function which will get triggered on the onShow event of the modal
 * @param {func} onHide - Accepts a function which will get triggered on the onHide event of the modal
 *
 * @example
 *
 * <Modal show={show} animation={false} size="lg" centered scrollable onShow={handleShow} onHide={handleClose}>
 */

export const Modal = ({
  children,
  show,
  backdrop = true,
  onHide,
  className,
  size = "lg",
  centered = false,
  ...props
}) => {
  return (
    <>
      {show ? (
        <>
          <div
            className={`modal fade show ${className} `}
            onClick={backdrop ? onHide : () => {}}
            tabIndex="-1"
            style={{ display: "block" }}
          >
            <div
              className={`modal-dialog ${
                centered ? "modal-dialog-centered" : ""
              } modal-${size}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">{children}</div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

/**
 * This is the Header of the Modal Component
 *
 * @param {string} children- Accepts string to be shown inside the modal header (Required)
 * @param {func} onHide- Accepts a function which will be triggered on clicking the closeButton on the header of the modal
 * @param {bool} closeButton- Accepts boolean value to show/not show the close button on the header of the modal
 * @param {string} closeLabel- Accepts string to provide a label for the closeButton on the header of the modal
 *
 * @example
 *
 *  <ModalHeader onHide={handleHide} closeButton closeLabel="Cancel">Title</ModalHeader>
 */

export const ModalHeader = ({
  children,
  onHide,
  className,
  closeButton = true,
}) => {
  return (
    <div className={`modal-header ${className}`}>
      {children}
      {closeButton && onHide && (
        <button className="btn-close" onClick={onHide}></button>
      )}
    </div>
  );
};

/**
 * This is the Body of the Modal Component
 *
 * @param {string} children- Accepts string to be shown inside the modal body (Required)
 *
 * @example
 *
 * <ModalBody>Body</ModalBody>
 */

export const ModalBody = ({ children, className }) => {
  return (
    <div
      className={`modal-body ${className} `}
      style={{ maxHeight: "70vh", overflowY: "auto" }}
    >
      {children}
    </div>
  );
};

/**
 * This is the Footer of the Modal Component
 *
 * @param {element} children- Accepts elementsto be shown inside the modal footer (Required)
 *
 * @example
 *
 * <ModalFooter> <Button onClick={handleClose}> OK </Button> </ModalFooter>
 */

export const ModalFooter = ({ children, className, ...props }) => {
  return <div className={`modal-footer ${className}`}>{children}</div>;
};
