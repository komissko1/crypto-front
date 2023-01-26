import discordLogo from "../images/DiscordLogo.svg";
import twitterLogo from "../images/TwitterLogo.svg";
import redditLogo from "../images/RedditLogo.svg";
import facebookLogo from "../images/FacebookLogo.svg";
import telegramLogo from "../images/TelegramLogo.svg";

//Landing page data
export const community = [
  {
    logosrc: discordLogo,
    link: "https://discord.com/",
    name: "Discord",
    text: "Discord Ask questions and engage with the Community"
  },
  {
    logosrc: twitterLogo,
    link: "https://twitter.com/",
    name: "Twitter",
    text: "Follow the latest news"
  },
  {
    logosrc: redditLogo,
    link: "https://reddit.com/",
    name: "Reddit",
    text: "Contribute to wide-ranging discussions"
  },
  {
    logosrc: facebookLogo,
    link: "https://facebook.com/",
    name: "Facebook",
    text: "Learn about recent grants recipients and program updates"
  },
  {
    logosrc: telegramLogo,
    link: "https://web.telegram.org/",
    name: "Telegram",
    text: "Stay up to date with announcements"
  }
];

export const landingStats = [
  {
    name: "Trade volume",
    value: "$1.2T+"
  },
  {
    name: "All Time Trades",
    value: "124M+"
  },
  {
    name: "Integrations",
    value: "300+"
  },
  {
    name: "Community Delegates",
    value: "4,400+"
  }
];

//All navigation bars data
export const mainNavBar = [
  {
    link: "/",
    name: "Home"
  },
  {
    link: "/prices",
    name: "Prices"
  },
  {
    link: "/exchange",
    name: "Exchange"
  }
];

export const accountNavBar = [
  {
    link: "/profile",
    name: "Profile"
  },
  {
    link: "/wallet",
    name: "Wallet&Stats"
  }
];

export const footerNavBar = [
  {
    link: "/FAQ",
    name: "FAQ"
  },
  {
    link: "/privacy",
    name: "Privacy policy"
  },
  {
    link: "/security",
    name: "Security"
  }
];

//Login and registration form alrets

export const alertText = {
  searchIsEmpty: "Please, enter the value",
  name: "Value has to be from 3 to 50 symbols long",
  email: "Not an e-mail",
  password: "Only figures, letters and special symbols allowed",
  serverError: "Server error",
  authorizationError: "Authorisation error",
  profileUpdated: "User's data updated",
  userExists: "User name already exists"
}

// Active tickers for the Landing page
export const activeTickers = [
  "usdteur",
  "btcusdt",
  "ethusdt",
  "xrpusdt",
  "shibusd",
  "dogeusd",
];

