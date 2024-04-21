import Sidebar from './components/Sidebar';

export default function Room() {
  return(
  <div className="">
    <h1>Music Room</h1>
    <main>
      <Sidebar />
      {/*Center*/}
    </main>
    <div>{/*Player*/}</div>
  </div>    
  );
}