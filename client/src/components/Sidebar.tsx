export function Sidebar() {
  return (
    <aside className="h-screen w-80 shrink-0 bg-violet-300 flex flex-col p-8">
      <h1 className="text-3xl text-violet-900">Chinese Auntie AI</h1>

      <p className="mt-4 text-lg text-violet-900 leading-relaxed">
        Hi guys! This project was inspired by my mom, who has spent the entire
        year lecturing me everytime we talk on the phone.
      </p>

      <p className="mt-4 text-lg text-violet-900 leading-relaxed">
        So naturally, I decided to solve the problem the only reasonable way: I
        made an AI that can lecture me for her.
      </p>

      <p className="mt-4 text-lg text-violet-900 leading-relaxed">
        Chinese Auntie AI is a chatbot that channels the energy of a Chinese
        auntie- complete with unsolicited life advice, questions about whether
        you've eaten, and strong opinions about your life choices.
      </p>

      <p className="mt-4 text-lg text-violet-900 leading-relaxed">
        Because sometimes you don't need an AI assistant.
      </p>

      <p className="mt-4 text-lg text-violet-900 leading-relaxed">
        Sometimes you just need an auntie to tell you that you're doing
        everything wrong. 🌟
      </p>

      <img src="sidebar_auntie.png" alt="Sidebar auntie" />
    </aside>
  );
}
