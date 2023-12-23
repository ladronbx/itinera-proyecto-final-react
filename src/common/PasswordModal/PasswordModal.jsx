import React, { useState } from 'react';
import { Modal, Form, Input, Button, Alert } from 'antd';
import { updatePassword, getProfile } from '../../services/apiCall';

function PasswordModal({ isOpen, onClose, rdxToken }) {
  const [errorMessages, setErrorMessages] = useState({
    password: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleUpdatePassword = (event) => {
    const { name, value } = event.target;
    setPassword({ ...password, [name]: value });
  }

  const handleUpdatePasswordClick = () => {
    updatePassword(password, rdxToken)
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data);
          getProfile(rdxToken)
            .then((response) => {
              console.log(response.data);
              onClose();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(response.data);
          setErrorMessages({ password: response.data.message });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessages({ password: "Asegúrate de que la contraseña antigua sea correcta. Recuerda que la nueva contraseña debe tener entre 6 y 12 carácteres e incluir al menos un símbolo" });
      });
  };

  return (
    <Modal
      title="Update Password"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form onFinish={handleUpdatePasswordClick}>
        <Form.Item>
          <Input.Password
            name="currentPassword"
            value={password.currentPassword}
            onChange={handleUpdatePassword}
            placeholder="Old password"
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            name="newPassword"
            value={password.newPassword}
            onChange={handleUpdatePassword}
            placeholder="New password"
          />
        </Form.Item>
        {errorMessages && errorMessages.password && (
          <Form.Item>
            <Alert type="error" message={errorMessages.password} />
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PasswordModal;