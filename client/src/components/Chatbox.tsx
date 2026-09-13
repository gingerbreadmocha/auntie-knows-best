const Topbar = () => {
  return (
    <div className="w-full border-violet-200 flex flex-row">
      <img
        className="w-20 h-20 rounded-full mr-8"
        src="auntie.png"
        alt="Rounded avatar"
      />
      <div className="flex flex-col border-b border-violet-200 w-full">
        <h2 className="text-3xl text-violet-900">Chinese auntie</h2>

        <p className="text-lg text-violet-900">Here to keep you on track!</p>
      </div>
    </div>
  );
};

export function Chatbox() {
  return (
    <div className="w-full max-w-4xl h-[80vh] border border-violet-200 rounded-xl shadow-lg p-6 flex flex-col justify-between items-center bg-orange-50">
      <Topbar />
    </div>
  );
}
