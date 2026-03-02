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
  name: string
  country: string
  region: string
  location: string
  description: string
  coordinates: { x: number; y: number }
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
      .filter((fileName) => /\.(jpe?g|png|mp4)$/i.test(fileName.toLowerCase()))
      .sort((a, b) => {
        if (/^cover\.(jpe?g|png)$/i.test(a.toLowerCase())) return -1
        if (/^cover\.(jpe?g|png)$/i.test(b.toLowerCase())) return 1
        return a.localeCompare(b)
      })
    const coverFile =
      allMedia.find((file) => /^cover\.(jpe?g|png)$/i.test(file.toLowerCase())) ??
      null
    const coverPath = coverFile
      ? `/images/projects/${folderName}/${coverFile}`
      : `/images/projects/${folderName}/cover.jpg`
    const otherMedia = allMedia
      .filter((file) => !/^cover\.(jpe?g|png)$/i.test(file.toLowerCase()))
      .map((file) => `/images/projects/${folderName}/${file}`)
    const media = [coverPath, ...otherMedia]

    if (!coverFile) {
      console.warn(`Warning: project folder ${folderName} missing cover.jpg`)
    }

    if (allMedia.length === 0) {
      console.warn(`Warning: project folder ${folderName} has no media files`)
    }

    const displacement = sameCountryCount > 0 ? 2 + Math.random() : 0 // 2%~3%
    const directionX = sameCountryCount % 2 === 0 ? 1 : -1
    const directionY = sameCountryCount % 3 === 0 ? -1 : 1

    projects.push({
      id: folderName,
      name: `${region} Project`,
      country,
      region,
      location: `${region}, ${country}`,
      description: `案例来自 ${region}，用于展示 SurfSmart 在 ${country} 的真实项目落地效果。`,
      coordinates: {
        x: base.x + displacement * directionX,
        y: base.y + displacement * directionY,
      },
      media,
    })
  }

  return projects
}

export default async function ProjectsPage() {
  const projectsData = await getProjectsData()
  return <ProjectsMap projectsData={projectsData} />
}
