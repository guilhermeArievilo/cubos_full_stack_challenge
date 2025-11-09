import { Replace } from "@/shared/helpers/Replace";
import { MovieStatus } from "./movieStatus";
import User from "@/core/user/domain/entity/user";
import createSlug from "@/shared/helpers/slugify";
import generateId from "@/shared/helpers/generateUUID";
import Genre from "./genre";
import { Rating } from "./rating";

export type MovieProps = {
  title: string;
  originalTitle: string;
  tagline: string;
  synopsis: string;
  genres: Genre[] | string[];
  backdropPath: string;
  posterPath: string;
  rating: Rating;
  voteCount: number;
  voteAverage: number;
  duration: number;
  status: MovieStatus;
  budget: number;
  revenue: number;
  originalLanguage: string;
  trailerLink: string;
  releaseDate: Date;
}

export default class Movie {
  private _id: string;
  private props: Replace<MovieProps, {
    slug: string;
    createdById: string;
    createdAt: Date;
    updatedAt?: Date;
  }>;
  
  public constructor(
    props: Replace<MovieProps, { slug?: string; createdAt?: Date; updatedAt?: Date; }>,
    createdById: string,
    id?: string
  ) {
    this.props = {
      ...props,
      slug: this.props?.slug ?? createSlug(props.title),
      createdById,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id ?? generateId();
  }

  public get id(): string {
    return this._id;
  }

  public get title(): string {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
    this.props.slug = createSlug(title);
  }

  public get originalTitle(): string {
    return this.props.originalTitle;
  }

  public set originalTitle(originalTitle: string) {
    this.props.originalTitle = originalTitle;
  }

  public get tagline(): string {
    return this.props.tagline;
  }

  public set tagline(tagline: string) {
    this.props.tagline = tagline;
  }

  public get synopsis(): string {
    return this.props.synopsis;
  }

  public set synopsis(synopsis: string) {
    this.props.synopsis = synopsis;
  }

  public get genres(): Genre[] | string[] {
    return this.props.genres;
  }

  public set genres(genres: Genre[] | string[]) {
    this.props.genres = genres;
  }

  public get backdropPath(): string {
    return this.props.backdropPath;
  }

  public set backdropPath(backdropPath: string) {
    this.props.backdropPath = backdropPath;
  }

  public get posterPath(): string {
    return this.props.posterPath;
  }

  public set posterPath(posterPath: string) {
    this.props.posterPath = posterPath;
  }

  public get rating(): Rating {
    return this.props.rating;
  }

  public set rating(rating: Rating) {
    this.props.rating = rating;
  }

  public get voteCount(): number {
    return this.props.voteCount;
  }

  public set voteCount(voteCount: number) {
    this.props.voteCount = voteCount;
  }

  public get voteAverage(): number {
    return this.props.voteAverage;
  }

  public set voteAverage(voteAverage: number) {
    this.props.voteAverage = voteAverage;
  }

  public get duration(): number {
    return this.props.duration;
  }

  public set duration(duration: number) {
    this.props.duration = duration;
  }

  public get status(): MovieStatus {
    return this.props.status;
  }

  public set status(status: MovieStatus) {
    this.props.status = status;
  }

  public get budget(): number {
    return this.props.budget;
  }

  public set budget(budget: number) {
    this.props.budget = budget;
  }

  public get revenue(): number {
    return this.props.revenue;
  }

  public set revenue(revenue: number) {
    this.props.revenue = revenue;
  }

  public get profit(): number {
    return this.props.revenue - this.props.budget;
  }

  public get originalLanguage(): string {
    return this.props.originalLanguage;
  }

  public set originalLanguage(originalLanguage: string) {
    this.props.originalLanguage = originalLanguage;
  }

  public get releaseDate(): Date {
    return this.props.releaseDate;
  }

  public set releaseDate(releaseDate: Date) {
    this.props.releaseDate = releaseDate;
  }

  public get trailerLink(): string {
    return this.props.trailerLink;
  }

  public set trailerLink(trailerLink: string) {
    this.props.trailerLink = trailerLink;
  }

  public get slug(): string {
    return this.props.slug;
  }

  public get createdById(): string {
    return this.props.createdById;
  }

  public set createdById(createdById: string) {
    this.props.createdById = createdById;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}