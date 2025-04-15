import { Contact } from 'lucide-react'
import behance from '../public/icons/behance.svg'
import buymeacoffee from '../public/icons/buymeacoffee.svg'
import dribbble from '../public/icons/dribbble.svg'
import figma from '../public/icons/figma.svg'
import github from '../public/icons/github.svg'
import gumroad from '../public/icons/gumroad.svg'
import instagram from '../public/icons/instagram.svg'
import kofi from '../public/icons/kofi.svg'
import linkedin from '../public/icons/icons8-linkedin.svg'
import medium from '../public/icons/icons8-medium.svg'
import patreon from '../public/icons/patreon.svg'
import producthunt from '../public/icons/producthunt.svg'
import readcv from '../public/icons/read-cv.svg'
import reddit from '../public/icons/reddit.svg'
import tiktok from '../public/icons/tiktok.svg'
import twitch from '../public/icons/twitch.svg'
import x from '../public/icons/x.svg'
import youtube from '../public/icons/youtube.svg'
import phone from '../public/icons/phone.svg'
import email from '../public/icons/email.svg'

type SocialMedia = (typeof websites)[number]

type Link = {
  title: string
  icon: any
  link: string
  text?: string
}

const websites = [
  'behance',
  'buymeacoffee',
  'dribbble',
  'figma',
  'github',
  'gumroad',
  'instagram',
  'kofi',
  'linkedin',
  'medium',
  'patreon',
  'producthunt',
  'readcv',
  'reddit',
  'tiktok',
  'twitch',
  'x',
  'youtube',
  'phone',
]

const LINKS: { [key in SocialMedia]: Link } = {
  readcv: {
    title: 'Read CV',
    icon: readcv,
    link: 'https://jade-binnie-84.tiiny.site',
    text: '@aarav_matalia',
  },
  github: {
    title: 'Github',
    icon: github,
    link: 'https://github.com/aaravmat1209',
    text: '@aaravmat1209',
  },
  linkedin: {
    title: 'Linkedin',
    icon: linkedin,
    link: 'https://www.linkedin.com/in/aarav-matalia/',
    text: '@aarav-matalia',
  },

  medium: {
    title: 'Medium',
    icon: medium,
    link: 'https://medium.com/@Aarav129',
    text: '@Aarav129',
  },
  instagram: {
    title: 'Instagram',
    icon: instagram,
    link: 'https://www.instagram.com/boy_got_beats/',
    text: '@boy_got_beats',
  },
  email: {
    title: 'Email',
    icon: email,
    link: 'mailto:mataliaaarav@gmail.com',
    text: 'Email me',
  },
}

export default LINKS
