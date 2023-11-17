import {
  ClipboardList,
  Layers,
  LucideIcon,
  MonitorPlay,
  PlayCircle,
} from 'lucide-react'

type Categories = {
  id: string
  title: string
  slug: string
  image: string
  nc: string
  imgColor: string
  bgColor: string
}[]

export const categories: Categories = [
  {
    id: '1',
    title: 'Label',
    slug: 'label',
    image: '/icons/Cpu.svg',
    nc: '63,476',
    imgColor: '#fff',
    bgColor: '#EBEBFF',
  },
  {
    id: '2',
    title: 'Business',
    slug: 'business',
    image: '/icons/Handshake.svg',
    nc: '52,822',
    imgColor: '#fff',
    bgColor: '#E1F7E3',
  },
  {
    id: '3',
    title: 'Finance & Accounting',
    slug: 'finance',
    image: '/icons/CreditCard.svg',
    nc: '33,841',
    imgColor: '#fff',
    bgColor: '#FFF2E5',
  },
  {
    id: '4',
    title: 'IT & Software',
    slug: 'it',
    image: '/icons/ChartBarHorizontal.svg',
    nc: '22,649',
    imgColor: '#fff',
    bgColor: '#FFF0F0',
  },
  {
    id: '5',
    title: 'Personal Development',
    slug: 'development',
    image: '/icons/BugDroid.svg',
    nc: '63,476',
    imgColor: '#FF6636',
    bgColor: '#fff',
  },
  {
    id: '6',
    title: 'Office Production',
    slug: 'office',
    image: '/icons/Receipt.svg',
    nc: '52,822',
    imgColor: '#fff',
    bgColor: '#F5F7FA',
  },
  {
    id: '7',
    title: 'Marketing',
    slug: 'finance',
    image: '/icons/MegaphoneSimple.svg',
    nc: '12,098',
    imgColor: '#fff',
    bgColor: '#EBEBFF',
  },
  {
    id: '8',
    title: 'Photography & Video',
    slug: 'photography',
    image: '/icons/Camera.svg',
    nc: '6,196',
    imgColor: '#fff',
    bgColor: '#F5F7FA',
  },
  {
    id: '9',
    title: 'Life Style',
    slug: 'life',
    image: '/icons/Package.svg',
    nc: '2,736',
    imgColor: '#fff',
    bgColor: '#FFF2E5',
  },
  {
    id: '10',
    title: 'Design',
    slug: 'design',
    image: '/icons/PenNib.svg',
    nc: '2,600',
    imgColor: '#fff',
    bgColor: '#FFEEE8',
  },
  {
    id: '11',
    title: 'Health & Fitness',
    slug: 'health',
    image: '/icons/FirstAidKit.svg',
    nc: '1,678',
    imgColor: '#fff',
    bgColor: '#E1F7E3',
  },
  {
    id: '12',
    title: 'Music',
    slug: 'music',
    image: '/icons/Headphones.svg',
    nc: '1,678',
    imgColor: '#fff',
    bgColor: '#FFF2E5',
  },
]

type BestCourses = {
  id: string
  category: string
  price: string
  title: string
  image: string
  studentNo: string
}[]

export const bestCourses: BestCourses = [
  {
    id: '1',
    category: 'Design',
    price: '57',
    title: 'Machine Learning A-Z: Hands-On Python & R in Data Management',
    image: '/images/c1.png',
    studentNo: '265.7k',
  },
  {
    id: '2',
    category: 'Developments',
    price: '57',
    title: 'The Complete 2023 Web Development Bootcamp',
    image: '/images/c2.png',
    studentNo: '265.7k',
  },
  {
    id: '3',
    category: 'Business',
    price: '57',
    title: 'learn Python Programmaing Masterclass',
    image: '/images/c3.png',
    studentNo: '265.7k',
  },
  {
    id: '4',
    category: 'IT & Software',
    price: '57',
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    image: '/images/c4.png',
    studentNo: '265.7k',
  },
  {
    id: '5',
    category: 'Marketing',
    price: '57',
    title: 'Reiki Level I, II Master/Teacher Program',
    image: '/images/c5.png',
    studentNo: '265.7k',
  },
  {
    id: '6',
    category: 'Design',
    price: '57',
    title: 'Reiki Level I, II Master/Teacher Program',
    image: '/images/c6.png',
    studentNo: '265.7k',
  },
  {
    id: '7',
    category: 'Helath & Fitness',
    price: '57',
    title: 'Reiki Level I, II Master/Teacher Program',
    image: '/images/c7.png',
    studentNo: '265.7k',
  },
  {
    id: '8',
    category: 'Music',
    price: '57',
    title: 'Reiki Level I, II Master/Teacher Program',
    image: '/images/c8.png',
    studentNo: '265.7k',
  },
]

type FeaturedCourses = {
  id: string
  category: string
  price: string
  title: string
  tutor: string
  image: string
  studentNo: string
  time: string
}[]

export const featuredCourse: FeaturedCourses = [
  {
    id: '1',
    category: 'Health & Fitness',
    title: 'Machine Learning A-Z: Hands-On Python & R in Data Management',
    tutor: 'John Doe',
    image: '/images/c9.png',
    studentNo: '265.7k',
    time: '6',
    price: '14.00',
  },
  {
    id: '2',
    category: 'Development',
    title: 'The Complete 2023 Web Development Bootcamp',
    tutor: 'John Doe',
    image: '/images/c10.png',
    studentNo: '265.7k',
    time: '6',
    price: '14.00',
  },
  {
    id: '3',
    category: 'Productivity',
    title: 'Machine Learning A-Z: Hands-On Python & R in Data Management',
    tutor: 'John Doe',
    image: '/images/c7.png',
    studentNo: '265.7k',
    time: '6',
    price: '14.00',
  },
  {
    id: '4',
    category: 'Music',
    title: 'The Complete 2023 Web Development Bootcamp',
    tutor: 'John Doe',
    image: '/images/c8.png',
    studentNo: '265.7k',
    time: '6',
    price: '14.00',
  },
]

export const recentCourse: BestCourses = [
  {
    id: '1',
    category: 'Design',
    price: '57',
    title: 'Machine Learning A-Z: Hands-On Python & R in Data Management',
    image: '/images/c1.png',
    studentNo: '265.7k',
  },
  {
    id: '2',
    category: 'Developments',
    price: '57',
    title: 'The Complete 2023 Web Development Bootcamp',
    image: '/images/c2.png',
    studentNo: '265.7k',
  },
  {
    id: '3',
    category: 'Business',
    price: '57',
    title: 'learn Python Programmaing Masterclass',
    image: '/images/c3.png',
    studentNo: '265.7k',
  },
  {
    id: '4',
    category: 'IT & Software',
    price: '57',
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    image: '/images/c4.png',
    studentNo: '265.7k',
  },
]

type Instructor = {
  image: string
  name: string
  position: string
  rating: string
  studentNo: string
}[]

export const instructor: Instructor = [
  {
    image: '/images/i1.png',
    name: 'Devon Lane',
    position: 'Senior Developer',
    rating: '4.6',
    studentNo: '854',
  },
  {
    image: '/images/i2.png',
    name: 'Darrell Steward',
    position: 'Digital Product Designer',
    rating: '4.9',
    studentNo: '451,444',
  },
  {
    image: '/images/i3.png',
    name: 'Jane Cooper',
    position: 'UI/UX Designer',
    rating: '4.8',
    studentNo: '435,671',
  },
  {
    image: '/images/i4.png',
    name: 'Albert Flores',
    position: 'Adobe Instructor',
    rating: '4.7',
    studentNo: '511,123',
  },
  {
    image: '/images/i5.png',
    name: 'Kathryn Murphy',
    position: 'Lead Developer',
    rating: '4.2',
    studentNo: '2,711',
  },
]

type Tabs = {
  icon: LucideIcon
  label: string
  id: number
}[]

export const tabs: Tabs = [
  {
    icon: Layers,
    label: 'Basic Information',
    id: 1,
  },
  {
    icon: ClipboardList,
    label: 'Advanced Information',
    id: 2,
  },
  {
    icon: MonitorPlay,
    label: 'Curriculum',
    id: 3,
  },
  {
    icon: PlayCircle,
    label: 'Publish Course',
    id: 4,
  },
]
