import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import UFO from "./ufo";

interface IMsg {
  user: string;
  msg: string;
}

const user = "User_" + String(new Date().getTime()).substr(-3);

// component
const Chatroom: React.FC = () => {
  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>("");

  // @ts-ignore
  useEffect(() => {
    // connect to socket server
    const socket = io({
      path: "/api/socketio",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    socket.on("error", (err: any) => {
      console.log(err);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        user,
        msg,
      };

      // dispatch message to other users
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }
  };

  return (
    <div>
      <div>
        <h1>Realtime Chat App</h1>
        <h2>in Next.js and Socket.io</h2>
      </div>
      <div>
        <div>
          {chat.length ? (
            chat.map((chat, i) => <div key={"msg_" + i}>{chat.msg}</div>)
          ) : (
            <div>No chat messages</div>
          )}
        </div>
        <div>
          <div>
            <div>
              <input
                ref={inputRef}
                type="text"
                value={msg}
                placeholder={connected ? "Type a message..." : "Connecting..."}
                disabled={!connected}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
            </div>
            <div>
              <button onClick={sendMessage} disabled={!connected}>
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

  const [showUfo, setShowUfo] = useState(false);

  const handleLogoClick = () => setShowUfo(!showUfo);

  useEffect(() =>
    window.addEventListener("explodeUfo", () =>
      setTimeout(() => setShowUfo(false), 1000)
    )
  );

  return (
    <>
      <div className="header-container">
        <h1 className="header-title">FREE MY EXTRATERRESTRIAL HOMIES</h1>
        <div onClick={handleLogoClick}>
          <Logo />
        </div>

        {showUfo && <UFO />}

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

export default function Home() {
  const [searchResults] = useState(aliensmeta);

  return (
    <>
      <Header />
      <Chatroom />
    </>
  );
}
