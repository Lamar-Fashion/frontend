import '../../../styles/admin/pending-orders/pending-orders.css';
let order = {
  image: '',
  modelNum: 'As5HG',
  price: '1200',
  quantity: 2,
  color: 'black',
  size: 's',
  length: '47',
  buttouns: 'with buttouns - مع طقطق',
};
function PendingOrders() {
  return (
    <>
      <div className='pending-orders-container'></div>
    </>
  );
}

export default PendingOrders;
