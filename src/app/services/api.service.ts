import {
  throwError as observableThrowError,
  Observable,
} from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Phase_Response_V1,
  Journey_Templates_Section_Response,
  Journey_Template_Response_V1,
  IAthlete_Response_V1,
  ISignInDTO_V1,
  IAthletePublicInfo,
  IVideoResponse_V1,
  IPhotoResponse_V1,
  IPlanAndUsernameInfo,
  IPlanPublicInfo
} from "superfitjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class ApiService {
  phases: Observable<Phase_Response_V1[]>;
  catalogSections: Observable<Journey_Templates_Section_Response[]>;
  journeyTemplates: Observable<Journey_Template_Response_V1[]>;

  athletesBaseUrl(): string {
    return `${environment.superfit_build_base_uri}/v1/athletes`;
  }

  workoutsUrl(): string {
    return `${environment.superfit_workouts_base_uri}`;
  }

  exerciseTemplatesBaseUrl(version: number): string {
    return `${environment.superfit_build_base_uri}/v1/exercise-templates`;
  }

  workoutCatalogBaseUrl(): string {
    return `${environment.superfit_build_base_uri}/v1/workout-templates`;
  }
  catalogSectionBaseUrl(version: number): string {
    return `${environment.superfit_build_base_uri}/v1/journeys-catalog`;
  }

  imagesBaseUrl(version: number): string {
    return `${environment.superfit_workouts_base_uri}/v${version}/images`;
  }

  journeyTemplatesBaseUrl(version: number): string {
    return `${environment.superfit_build_base_uri}/v1/journey-templates`;
  }

  phasesBaseUrl(): string {
    return `${environment.superfit_build_base_uri}/v1/phases`;
  }

  professionalsPublicBaseUrl(): string {
    return `${environment.superfit_build_base_uri}/v1/professionals`;
  }

  constructor(
    private http: HttpClient
  ) {
    this.phases = this.fetchAll<Phase_Response_V1>(this.phasesBaseUrl());
    this.catalogSections = this.fetchAll<Journey_Templates_Section_Response>(
      this.catalogSectionBaseUrl(1)
    );
    this.journeyTemplates = this.fetchAll<Journey_Template_Response_V1>(
      this.journeyTemplatesBaseUrl(1)
    );
  }

  signIn(dto: ISignInDTO_V1): Observable<IAthlete_Response_V1> {
    const url = `${this.workoutsUrl()}/sign-in`;
    const headers = this.requestHeaders();

    return this.http.post<IAthlete_Response_V1>(url, dto, {
      headers: headers
    });
  }

  fetchUserPublicInfo(username: string): Observable<IAthletePublicInfo> {
    const url = `${environment.superfit_workouts_base_uri}/v1/show/athletes/${username}`;
    return this.http.get<IAthletePublicInfo>(url)
  }

  fetchPlanInfo(
    planId: string,
    planOfferId?: string,
  ): Observable<IPlanAndUsernameInfo> {
    const url = `${environment.superfit_workouts_base_uri}/v1/show/plans/${planId}`;
    const params = {}

    if (planOfferId) {
      params['planOfferId'] = planOfferId
    }

    return this.http.get<IPlanAndUsernameInfo>(url, {
      params: params
    })
  }

  fetchPlansInfo(
    username: string,
    offset: number,
    take: number = 5
  ): Observable<IPlanPublicInfo[]> {
    const url = `${environment.superfit_workouts_base_uri}/v1/show/professionals/${username}/plans`;
    return this.http.get<IPlanPublicInfo[]>(url, {
      params: {
        offset: offset.toString(),
        take: take.toString()
      }
    })
  }

  fetchOne<T>(url: string): Observable<T | undefined> {
    const headers = this.requestHeaders();
    return this.http.get<T>(url, { headers: headers });
  }

  private fetchAll<T>(url: string): Observable<T[] | undefined> {
    const headers = this.requestHeaders();
    return this.http.get<T[]>(url, { headers: headers });
  }

  /**
   * Generic helpers.
   */
  updateEntity<T>(json: any, url): Observable<T> {
    const headers = this.requestHeaders();
    return this.http.put<T>(url, json, {
      headers: headers
    });
  }
  private createEntity<T>(url: string, object: any): Observable<T> {
    const headers = this.requestHeaders();
    return this.http.post<T>(url, object, {
      headers: headers
    });
  }
  private deleteEntity(url: string): Observable<Response> {
    return this.http.delete<Response>(url, {
      headers: this.requestHeaders()
    });
  }

  private requestHeaders(): HttpHeaders {
    const token = localStorage.getItem("access_token");

    let bearer = "";
    if (token) {
      bearer = "Bearer " + token;
    }
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: bearer
    });

    return headers;
  }

  fetchVideos(
    ids: string[]
  ): Observable<IVideoResponse_V1[]> {
    const headers = this.requestHeaders();
    const url = `${this.imagesBaseUrl(1)}/videos`;
    return this.http.get<IVideoResponse_V1[]>(url, {
      headers: headers,
      params: {
        ids: ids
      }
    });
  }

  fetchPhotos(
    ids: string[]
  ): Observable<IPhotoResponse_V1[]> {
    const headers = this.requestHeaders();
    const url = `${this.imagesBaseUrl(1)}/photos`;
    return this.http.get<IPhotoResponse_V1[]>(url, {
      headers: headers,
      params: {
        ids: ids
      }
    });
  }
}
