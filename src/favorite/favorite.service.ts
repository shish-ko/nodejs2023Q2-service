// import { Injectable, Inject, HttpException } from '@nestjs/common';
// import { DBservice } from 'src/dataBase/db.service';
// import { validate } from 'uuid';

// @Injectable()
// export class FavoriteService {
//   constructor(@Inject(DBservice) private db: DBservice) {}

//   getAll() {
//     return {
//       artists: this.db.artists.findMany(this.db.favorites.artists),
//       tracks: this.db.tracks.findMany(this.db.favorites.tracks),
//       albums: this.db.albums.findMany(this.db.favorites.albums),
//     };
//   }

//   addFavs(type: string, id: string) {
//     if (!validate(id)) throw new HttpException('invalid id', 400);
//     const item = this.db[`${type}s`].findUnique(id);
//     if (!item) {
//       throw new HttpException(`${type} with provided id does not exist`, 422);
//     }
//     this.db.favorites[`${type}s`].push(id);
//   }

//   removeFavs(type: string, id: string) {
//     if (!validate(id)) throw new HttpException('invalid id', 400);
//     const itemIndex = (this.db.favorites[`${type}s`] as string[]).indexOf(id);
//     if (itemIndex < 0)
//       throw new HttpException(`${type} is not in the favorites`, 404);
//     (this.db.favorites[`${type}s`] as string[]).splice(itemIndex, 1);
//   }
// }
