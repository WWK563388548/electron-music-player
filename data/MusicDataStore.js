const Store = require('electron-store');
const uuid = require('uuid/v4');
const path = require('path');

class MusicDataStore extends Store {
    constructor(settings){
        super(settings);

        this.tracks = this.get('tracks') || [];
    }

    saveTracks(){
        this.set('tracks', this.tracks);
        return this;
    }

    getTracks(){
        return this.get('tracks') || [];
    }

    addTracks(tracks){
        const tracksWithProps = tracks.map(track => {
            return {
                id: uuid(),
                path: track,
                fileName: path.basename(track),
            };
        }).filter(track => {
            const currentTrackPath = this.getTracks().map(track => {
                return track.path;
            });
            return currentTrackPath.indexOf(track.path) < 0;
        });

        this.tracks = [...this.tracks, ...tracksWithProps];
        return this.saveTracks();
    }
}

module.exports = MusicDataStore;