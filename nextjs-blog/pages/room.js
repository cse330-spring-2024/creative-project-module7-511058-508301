import Sidebar from '/components/Sidebar';
import Center from '/components/Center';

export default function Room() {
  return(
  <div className="bg-black">
    <main className="flex">
      <Sidebar />
      <Center />
    </main>
    <div>{/*Player*/}</div>
  </div>    
  );
}