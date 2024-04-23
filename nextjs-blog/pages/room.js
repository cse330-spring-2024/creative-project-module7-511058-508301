import Sidebar from '/components/Sidebar';
import Center from '/components/Center';
// import Search from '/components/Search';

export default function Room() {
  return(
  <div className="bg-black">
    <main className="flex">
      <Sidebar />
      <Center />
      {/* <Search /> */}
    </main>
    <div>{/*Player*/}</div>
  </div>    
  );
}