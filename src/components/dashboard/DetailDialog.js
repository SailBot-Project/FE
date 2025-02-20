import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const DetailDialog = ({ data, isOpen, toggleDialog }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleDialog}>
      <ModalHeader toggle={toggleDialog}>상세정보</ModalHeader>
      <ModalBody>
        <p>{data ? data.content : null}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleDialog}>
          닫기
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DetailDialog;
