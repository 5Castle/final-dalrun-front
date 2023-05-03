import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MemberUpdate from './update/MemberUpdate';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProductUpdate from './update/ProductUpdate';
import CrewUpdate from './update/CrewUpdate';
import ProductRegi from './register/ProductRegi';
import OrderUpdate from './update/OrderUpdate';

function CustomModal(props) {
  const separator = ', ';
  const {cate, sub} = useParams();
  const [data, setData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  const getTarget = () => {
    if(props.checked.length !== 0) {
      axios.post(`http://localhost:3000/get${cate}`, null, { params:{ "target":props.checked[0] } })
      .then((resp) => {
            setData(resp.data);
            console.log("getTarget");
          })
          .catch((err) => {
              console.log(err);
          })
    }
  }

  const delTargets = () => {
    axios.post(`http://localhost:3000/admin_del${cate}`, null, { params:{ "checkedList": props.checked.join(',') }})
        .then((resp) => {
          console.log(resp.data);
          if(resp.data === "YES") {
            alert("삭제완료");
            props.onHide()
            setSearchParam(searchParam.set('target',''));
          } else {
            alert("삭제실패")
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  const ModalBody = () => {
    if(props.category === "update") {
      if(cate === "member") return <MemberUpdate data={data} onHide={props.onHide} />;
      else if(cate === "product") return <ProductUpdate data={data} onHide={props.onHide} />;
      else if(cate === "crew") return <CrewUpdate data={data} onHide={props.onHide} />;
      else if(cate === "order") return <OrderUpdate data={data} onHide={props.onHide} />;
    } else if(props.category === "delete") {
      if(cate === "member") return "이 회원을 탈퇴시키겠습니까?";
      else if(cate === "product") return "이 상품을 삭제하겠습니까?";
      else if(cate === "order") return "이 주문내역을 삭제하겠습니까?";
    } else if(props.category === "insert") {
      if(cate === "product") return <ProductRegi onHide={props.onHide} />
    }
  }

  useEffect(()=>{
    getTarget();
  }, [props.checked[0]]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {props.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>[ {props.checked.join(separator)} ]</div>
        <ModalBody />
      </Modal.Body>
      <Modal.Footer>
        {
          props.category === "delete" ?
            <>
              <Button variant="secondary" onClick={props.onHide}>취소</Button>
              <Button variant="primary" onClick={delTargets}>확인</Button>
            </> : ''
        }
      </Modal.Footer>
    </Modal>
  );
}

export default CustomModal;