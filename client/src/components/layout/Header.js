import { useState } from "react";
import {
  Button,
  Collapse,
  Modal,
  ModalBody,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import { useAuth } from "../../context/auth";
import StaticProfile from "../../static/static-profile.svg";

const Header = ({ isMobile }) => {
  const { logout, user } = useAuth();
  const [isOpenCollapse, setisOpenCollapse] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);

  const toggleCollapse = () => setisOpenCollapse(!isOpenCollapse);

  const toggleModal = () => setisOpenModal(!isOpenModal);

  return (
    <Navbar className="header shadow-sm" color="light" light expand="md">
      <NavbarBrand href="/">Klasifikasi Masker</NavbarBrand>
      <NavbarToggler onClick={toggleCollapse} />
      <Collapse isOpen={isOpenCollapse} navbar>
        <div
          className={`w-100 d-flex justify-content-end align-items-center${
            isMobile ? " py-2" : ""
          }`}
        >
          <span className="pe-3 fw-bold">{`Welcome${
            user?.name ? `, ${user.name}` : ""
          }!`}</span>

          <img
            src={StaticProfile}
            height={50}
            width={50}
            alt=""
            onClick={toggleModal}
          />
        </div>
      </Collapse>

      <Modal isOpen={isOpenModal} toggle={toggleModal} centered>
        <ModalBody className="d-flex flex-column fw-bold fs-5">
          <span>Are you sure you want to logout?</span>
          <div className="d-flex justify-content-end mt-4">
            <Button
              className="me-2 fw-bold"
              color="light"
              onClick={() => {
                toggleModal();
                logout();
              }}
            >
              Yes
            </Button>
            <Button className="fw-bold" color="primary" onClick={toggleModal}>
              No
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Navbar>
  );
};

export default Header;
