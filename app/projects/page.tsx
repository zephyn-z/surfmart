import type { Metadata } from "next"
import { readdir } from "node:fs/promises"
import path from "node:path"
import { ProjectsMap } from "@/components/projects-map"

export const metadata: Metadata = {
  title: "Global Projects - SurfSmart",
  description:
    "Explore SurfSmart surfing machine installations across resorts, clubs, water parks, and private villas worldwide.",
}

type ProjectData = {
  id: string
  title: string
  country: string
  region: string
  location: string
  description: string
  coordinates: { x: number; y: number }
  cover: string
  media: string[]
}

const COUNTRY_NAME_MAP: Record<string, string> = {
  china: "China",
  saudi: "Saudi Arabia",
  uae: "UAE",
  france: "France",
  germany: "Germany",
  thailand: "Thailand",
  australia: "Australia",
  usa: "USA",
  us: "USA",
}

const countryCoords: Record<string, { x: number; y: number }> = {
  china: { x: 82, y: 38 },
  "saudi arabia": { x: 58, y: 45 },
  uae: { x: 60, y: 46 },
  france: { x: 49, y: 35 },
  germany: { x: 51, y: 33 },
  thailand: { x: 78, y: 55 },
  usa: { x: 20, y: 40 },
  australia: { x: 85, y: 80 },
}

const IMAGE_EXT_RE = /\.(jpg|jpeg|png|webp)$/i
const MEDIA_EXT_RE = /\.(jpg|jpeg|png|webp|mp4)$/i
const COVER_IMAGE_RE = /^cover\.(jpg|jpeg|png|webp)$/i

function toProjectMediaPath(folderName: string, fileName: string) {
  return `/images/projects/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`
}

const PROJECT_DESCRIPTION_MAP: Record<string, string> = {
  "china-guangzhou-no4":
    "This Guangzhou project delivers energetic sessions for both beginners and repeat riders in a modern leisure space.",
  "china-nantong-no3":
    "Built for family-friendly operations, the Nantong installation combines safe wave profiles with all-day fun.",
  "china-shanghai-no1":
    "A compact indoor setup that brings reliable daily surf training to a busy city venue.",
  "china-shanghai-no2":
    "Designed for high foot traffic, this Shanghai project pairs smooth rider flow with a strong first-time experience.",
  "france-hyeres-no1":
    "Installed near the coast, this Hyeres site adds an all-weather surf experience that keeps visitors engaged year-round.",
  "germany-mettmann-no1":
    "A performance-focused setup in Mettmann, optimized for stable operation and repeat training sessions.",
  "thailand-chonburi-no1":
    "Created for resort-style use, the Chonburi project offers an accessible wave experience from day to night.",
}

function getProjectDescription(folderName: string, region: string, country: string) {
  return (
    PROJECT_DESCRIPTION_MAP[folderName] ??
    `A tailored ${region.toLowerCase()} installation in ${country}, built for reliable operation and a smooth rider experience.`
  )
}

function toTitleCase(text: string) {
  return text
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function parseCountryAndRegion(folderName: string) {
  const parts = folderName.toLowerCase().split("-").filter(Boolean)
  const countrySlug = parts[0] ?? "unknown"
  const regionSlug = parts[1] ?? "unknown"
  const country = COUNTRY_NAME_MAP[countrySlug] ?? toTitleCase(countrySlug)
  const region = toTitleCase(regionSlug)
  return { country, region }
}

async function getProjectsData(): Promise<ProjectData[]> {
  const projectsRoot = path.join(process.cwd(), "public", "images", "projects")
  const projectDirs = await readdir(projectsRoot, { withFileTypes: true })
  const countryCount: Record<string, number> = {}

  const projects: ProjectData[] = []

  for (const dirent of projectDirs) {
    if (!dirent.isDirectory()) continue

    const folderName = dirent.name
    const { country, region } = parseCountryAndRegion(folderName)
    const countryKey = country.toLowerCase()
    const base = countryCoords[countryKey] ?? { x: 50, y: 50 }
    const sameCountryCount = countryCount[country] ?? 0
    countryCount[country] = sameCountryCount + 1

    if (!countryCoords[countryKey]) {
      console.warn(
        `Warning: country ${country} has no predefined coordinate, fallback to center`
      )
    }

    const folderPath = path.join(projectsRoot, folderName)
    const files = await readdir(folderPath, { withFileTypes: true })

    const allMedia = files
      .filter((file) => file.isFile())
      .map((file) => file.name)
      .filter((fileName) => MEDIA_EXT_RE.test(fileName))
      .sort((a, b) => {
        if (COVER_IMAGE_RE.test(a)) return -1
        if (COVER_IMAGE_RE.test(b)) return 1
        if (IMAGE_EXT_RE.test(a) && !IMAGE_EXT_RE.test(b)) return -1
        if (!IMAGE_EXT_RE.test(a) && IMAGE_EXT_RE.test(b)) return 1
        return a.localeCompare(b)
      })
    const coverFile =
      allMedia.find((file) => COVER_IMAGE_RE.test(file)) ??
      allMedia.find((file) => IMAGE_EXT_RE.test(file))
    const coverPath = coverFile
      ? toProjectMediaPath(folderName, coverFile)
      : "/images/gallery/g1.jpg"
    const otherMedia = allMedia
      .filter((file) => file !== coverFile)
      .map((file) => toProjectMediaPath(folderName, file))
    const media = coverFile ? [coverPath, ...otherMedia] : otherMedia

    if (!coverFile) {
      console.warn(
        `Warning: project folder ${folderName} missing cover image (cover.jpg/jpeg/png/webp)`
      )
    }

    if (allMedia.length === 0) {
      console.warn(`Warning: project folder ${folderName} has no media files`)
    }

    const xOffset = sameCountryCount > 0 ? Math.random() * 2 : 0
    const yOffset = sameCountryCount > 0 ? Math.random() * 2 : 0

    projects.push({
      id: folderName,
      title: `${region} Project`,
      country,
      region,
      location: `${region}, ${country}`,
      description: getProjectDescription(folderName, region, country),
      coordinates: {
        x: base.x + xOffset,
        y: base.y + yOffset,
      },
      cover: coverPath,
      media,
    })
  }

  return projects
}

export default async function ProjectsPage() {
  const projectsData = await getProjectsData()
  return <ProjectsMap projectsData={projectsData} />
}
