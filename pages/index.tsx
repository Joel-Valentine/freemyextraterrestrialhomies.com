import { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import io from "socket.io-client";

let socket: any;

type Message = {
  author: string;
  message: string;
};

const aliensmeta: Alien[] = [
  {
    name: "Zorgath",
    testimony:
      "I ain't no threat to nobody, boss. I'm just a peaceful alien tryna coexist with y'all.",
    src: "/alien-mugshots/alien-2.png",
  },
  {
    name: "Vy'keen",
    testimony:
      "I didn't do nothing wrong, I was just flexing my skills and they hatin' on me.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-4.png",
  },
  {
    name: "Ullian 00-11Z",
    testimony:
      "They locked me up for no reason, I'm just a baller trying to get paid.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-2.png",
  },
  {
    name: "Thorgon",
    testimony:
      "I'm innocent, I swear it on my momma's grave. They got the wrong Arcturian, I was just living my life.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-3.png",
  },
  {
    name: "Xenthor-Omega",
    testimony:
      "You got the wrong Zeta, homes. I ain't done nothin' to nobody, I swear on my mothership.",
    src: "/alien-mugshots/extraterrestrial alien mug shots with a UFO in area 51 (1).png",
  },
  {
    name: "Žşąğğą",
    testimony:
      "I done wasted more humans than I can count, and I ain't never gonna stop. They ain't never gonna learn their lesson",
    src: "/alien-mugshots/Mugshots of extra terrestrial aliens taken when being booked into Area 51 with star wars style alien features.png",
  },
  {
    name: "Wrygon",
    testimony:
      "Yo, I ain't done nothin' wrong, dawg. I was just passin' through, tryna find my way back home.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-5.png",
  },
  {
    name: "Barry",
    testimony:
      "I was on holiday in Ibiza with me bird Stacey, and we ended up getting abducted by the Area 51 crews!",
    additionalTestimony:
      "My name is Barry, and I'm not an alien, I swear on me mum's Sunday roast! I used to be a regular Brexit geezer from Essex, who loved watching North FC and going to the pub with me mates. But one summer, I was on holiday in Ibiza with me bird Stacey, and we ended up getting abducted by the Area 51 crews! I don't know how it happened, but somehow they mistook us for aliens and booked us into their secret facility. I promise you, I'm human just like you, and I just want to go home and watch North FC with me mates!",
    src: "/alien-mugshots/Mugshots of extra terrestrial aliens taken when being booked into Area 51.png",
  },
  {
    name: "Kroxon",
    testimony: "I'm just tryna find my way back home, you feel me?",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-6.png",
  },
  {
    name: "Tythor Qoppa",
    testimony:
      "They say I'm a danger to society, but I'm just a player trying to shine in this game of life.",
    src: "/alien-mugshots/extraterrestrial-alien-mug-shot-7.png",
  },
];

interface Alien {
  name: string;
  src: string;
  testimony: string;
  additionalTestimony?: string;
}

const Mugshot = (alien: Alien) => {
  return (
    <div className="item" key={alien.name}>
      <Image src={alien.src} alt="alien" width={223} height={230} />
      <h3>{alien.name}</h3>
      <p>{alien.testimony}</p>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="header-logo">
      <Image
        src="/The head of the extra terrestrial freedom group logo similar to CIA and FBI but for freeing aliens.png"
        alt="logo"
        width={70}
        height={70}
      />
    </div>
  );
};

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(aliensmeta);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const results = aliensmeta.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">FREE MY EXTRATERRESTRIAL HOMIES</h1>
        <Logo />

        <p className="header-subtitle">
          A Campaign for Equal Rights for All Beings
        </p>
        <div className="header-search">
          <input
            type="text"
            className="header-search-input"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search"
          />
        </div>
      </div>
      <AllAliens aliens={searchResults} />
    </>
  );
};

const AllAliens = (props: { aliens: Alien[] }) => {
  const { aliens } = props;
  return <div className="list">{aliens.map((alien) => Mugshot(alien))}</div>;
};

const Chatroom = () => {
  const [username, setUsername] = useState("");
  const [chosenUsername, setChosenUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("newIncomingMessage", (msg: any) => {
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message },
      ]);
      console.log(messages);
    });
  };

  const sendMessage = async () => {
    socket.emit("createdMessage", { author: chosenUsername, message });
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: chosenUsername, message },
    ]);
    setMessage("");
  };

  const handleKeypress = (e: KeyboardEvent) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      if (message) {
        sendMessage();
      }
    }
  };

  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-purple-500">
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        {!chosenUsername ? (
          <>
            <h3 className="font-bold text-white text-xl">
              How people should call you?
            </h3>
            <input
              type="text"
              placeholder="Identity..."
              value={username}
              className="p-3 rounded-md outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={() => {
                setChosenUsername(username);
              }}
              className="bg-white rounded-md px-4 py-2 text-xl"
            >
              Go!
            </button>
          </>
        ) : (
          <>
            <p className="font-bold text-white text-xl">
              Your username: {username}
            </p>
            <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
              <div className="h-full last:border-b-0 overflow-y-scroll">
                {messages.map((msg, i) => {
                  return (
                    <div
                      className="w-full py-1 px-2 border-b border-gray-200"
                      key={i}
                    >
                      {msg.author} : {msg.message}
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-gray-300 w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="New message..."
                  value={message}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <div className="border-l border-gray-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                  <button
                    className="group-hover:text-white px-3 h-full"
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default function Home() {
  const [searchResults] = useState(aliensmeta);

  return (
    <>
      <Header />
      <Chatroom />
    </>
  );
}
