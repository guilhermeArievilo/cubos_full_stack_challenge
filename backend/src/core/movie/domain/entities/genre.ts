import generateId from "@/shared/helpers/generateUUID";
import { Replace } from "@/shared/helpers/Replace";
import createSlug from "@/shared/helpers/slugify";

export type GenreProps = {
  name: string;
}

export default class Genre {
  private _id: string;
  private props: Replace<GenreProps, {
    slug: string;
  }>;
  
  public constructor(
    props: GenreProps,
    id?: string
  ) {
    this.props = {
      ...props,
      slug: createSlug(props.name)
    };

    this._id = id ?? generateId();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get slug(): string {
    return this.props.slug;
  }
}