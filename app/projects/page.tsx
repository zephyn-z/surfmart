import type { Metadata } from "next"
import { ProjectsMap } from "@/components/projects-map"

export const metadata: Metadata = {
  title: "Global Projects - SurfSmart",
  description:
    "Explore SurfSmart surfing machine installations across resorts, clubs, water parks, and private villas worldwide.",
}

/**
 * 项目案例数据结构
 * 素材路径指引：请在 public/images/projects/ 下为每个项目创建子文件夹，例如：
 * - public/images/projects/saudi/  (沙特)
 * - public/images/projects/uae/   (阿联酋)
 * - public/images/projects/china/ (中国)
 * - public/images/projects/australia/ (澳大利亚)
 * - public/images/projects/usa/   (美国)
 * 每个子文件夹内放置该项目的现场照片或视频，如 1.jpg, 2.jpg, demo.mp4 等
 */
export const projectsData = [
  {
    id: "sa",
    name: "Riyadh Surf Resort",
    location: "Saudi Arabia",
    description:
      "奢华度假村冲浪池项目，采用 WavePro X1 专业级造浪设备，打造中东地区顶级冲浪体验。项目包含室内恒温冲浪池、专业教练区及观景休息区，为度假村宾客提供全年无休的冲浪乐趣。",
    coordinates: { x: 62, y: 36.8 },
    media: [
      "/images/model-1.jpg",
      "/images/model-2.jpg",
      "/images/model-3.jpg",
      "/images/model-4.jpg",
    ],
  },
  {
    id: "ae",
    name: "Dubai Aqua Park",
    location: "UAE",
    description:
      "迪拜水上乐园商业级冲浪设备标杆项目。TideForce M3 高容量造浪系统为乐园带来稳定持续的波浪，配合专业安全设施与救生团队，日均接待量超 2000 人次，成为中东水上娱乐新地标。",
    coordinates: { x: 64.8, y: 39.3 },
    media: [
      "/images/model-2.jpg",
      "/images/model-3.jpg",
      "/images/segment-waterpark.jpg",
      "/images/model-1.jpg",
    ],
  },
  {
    id: "cn",
    name: "Shanghai Surf Club",
    location: "China",
    description:
      "上海都市冲浪俱乐部，室内冲浪新地标。FlowRider S2 紧凑型站立式造浪机完美适配城市商业空间，为都市白领提供便捷的冲浪健身与社交体验，开业以来已成为沪上运动达人的打卡圣地。",
    coordinates: { x: 79, y: 42 },
    media: [
      "/images/model-3.jpg",
      "/images/segment-club.jpg",
      "/images/model-1.jpg",
      "/images/model-4.jpg",
    ],
  },
  {
    id: "au",
    name: "Gold Coast Wave Pool",
    location: "Australia",
    description:
      "黄金海岸冲浪池项目，专业级训练与娱乐兼备。配备多档位可调波浪系统，既可满足职业冲浪手的高强度训练需求，也可为家庭游客提供温和的初学体验，与黄金海岸天然海滩形成完美互补。",
    coordinates: { x: 87.5, y: 81.7 },
    media: [
      "/images/model-4.jpg",
      "/images/segment-resort.jpg",
      "/images/model-2.jpg",
      "/images/model-3.jpg",
    ],
  },
  {
    id: "us",
    name: "California Surf Academy",
    location: "USA",
    description:
      "加州冲浪学院职业冲浪手训练基地。采用顶级造浪设备，可模拟多种海浪形态，为职业选手提供精准的训练环境。同时开设青少年冲浪课程，培养下一代冲浪人才，传承加州冲浪文化。",
    coordinates: { x: 21, y: 40.8 },
    media: [
      "/images/segment-resort.jpg",
      "/images/model-1.jpg",
      "/images/model-4.jpg",
      "/images/segment-villa.jpg",
    ],
  },
]

export default function ProjectsPage() {
  return <ProjectsMap projectsData={projectsData} />
}
