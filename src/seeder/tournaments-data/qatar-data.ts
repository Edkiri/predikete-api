import { DateTime } from 'luxon';
import { PhaseOptions } from 'src/tournament/interfaces/phase.enum';
import {
  IGroupStage,
  IMatch,
  ITeam,
  ITournament,
} from 'src/tournament/interfaces/tournament.interface';
import { QatarTeams } from './teams.enum';

export const tournamentData: ITournament = {
  name: 'FIFA World Cup Qatar 2022',
};

export const groupStagesData: IGroupStage[] = [
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
  { name: 'D' },
  { name: 'E' },
  { name: 'F' },
  { name: 'G' },
  { name: 'H' },
];

export const teamsData: ITeam[] = [
  {
    name: QatarTeams.ARGENTINA,
    image: `${QatarTeams.ARGENTINA}.png`.replace(' ', '-'),
    groupStageName: 'C',
  },
  {
    name: QatarTeams.BELGIUM,
    image: `${QatarTeams.BELGIUM}.png`.replace(' ', '-'),
    groupStageName: 'F',
  },
  {
    name: QatarTeams.BRAZIL,
    image: `${QatarTeams.BRAZIL}.png`.replace(' ', '-'),
    groupStageName: 'G',
  },
  {
    name: QatarTeams.CAMEROON,
    image: `${QatarTeams.CAMEROON}.png`.replace(' ', '-'),
    groupStageName: 'G',
  },
  {
    name: QatarTeams.CANADA,
    image: `${QatarTeams.CANADA}.png`.replace(' ', '-'),
    groupStageName: 'F',
  },
  {
    name: QatarTeams.COSTA_RICA,
    image: `${QatarTeams.COSTA_RICA}.png`.replace(' ', '-'),
    groupStageName: 'E',
  },
  {
    name: QatarTeams.CROATIA,
    image: `${QatarTeams.CROATIA}.png`.replace(' ', '-'),
    groupStageName: 'F',
  },
  {
    name: QatarTeams.DENMARK,
    image: `${QatarTeams.DENMARK}.png`.replace(' ', '-'),
    groupStageName: 'D',
  },
  {
    name: QatarTeams.ECUADOR,
    image: `${QatarTeams.ECUADOR}.png`.replace(' ', '-'),
    groupStageName: 'A',
  },
  {
    name: QatarTeams.ENGLAND,
    image: `${QatarTeams.ENGLAND}.png`.replace(' ', '-'),
    groupStageName: 'B',
  },
  {
    name: QatarTeams.FRANCE,
    image: `${QatarTeams.FRANCE}.png`.replace(' ', '-'),
    groupStageName: 'D',
  },
  {
    name: QatarTeams.GERMANY,
    image: `${QatarTeams.GERMANY}.png`.replace(' ', '-'),
    groupStageName: 'E',
  },
  {
    name: QatarTeams.GHANA,
    image: `${QatarTeams.GHANA}.png`.replace(' ', '-'),
    groupStageName: 'H',
  },
  {
    name: QatarTeams.IRAN,
    image: `${QatarTeams.IRAN}.png`.replace(' ', '-'),
    groupStageName: 'B',
  },

  {
    name: QatarTeams.JAPAN,
    image: `${QatarTeams.JAPAN}.png`.replace(' ', '-'),
    groupStageName: 'E',
  },
  {
    name: QatarTeams.MEXICO,
    image: `${QatarTeams.MEXICO}.png`.replace(' ', '-'),
    groupStageName: 'C',
  },
  {
    name: QatarTeams.MOROCCO,
    image: `${QatarTeams.MOROCCO}.png`.replace(' ', '-'),
    groupStageName: 'F',
  },
  {
    name: QatarTeams.NETHERLANDS,
    image: `${QatarTeams.NETHERLANDS}.png`.replace(' ', '-'),
    groupStageName: 'A',
  },
  {
    name: QatarTeams.AUSTRALIA,
    image: `${QatarTeams.AUSTRALIA}.png`.replace(' ', '-'),
    groupStageName: 'D',
  },
  {
    name: QatarTeams.POLAND,
    image: `${QatarTeams.POLAND}.png`.replace(' ', '-'),
    groupStageName: 'C',
  },
  {
    name: QatarTeams.PORTUGAL,
    image: `${QatarTeams.PORTUGAL}.png`.replace(' ', '-'),
    groupStageName: 'H',
  },
  {
    name: QatarTeams.QATAR,
    image: `${QatarTeams.QATAR}.png`.replace(' ', '-'),
    groupStageName: 'A',
  },
  {
    name: QatarTeams.SAUDI_ARABIA,
    image: `${QatarTeams.SAUDI_ARABIA}.png`.replace(' ', '-'),
    groupStageName: 'C',
  },
  {
    name: QatarTeams.SENEGAL,
    image: `${QatarTeams.SENEGAL}.png`.replace(' ', '-'),
    groupStageName: 'A',
  },
  {
    name: QatarTeams.SERBIA,
    image: `${QatarTeams.SERBIA}.png`.replace(' ', '-'),
    groupStageName: 'G',
  },
  {
    name: QatarTeams.SOUTH_KOREA,
    image: `${QatarTeams.SOUTH_KOREA}.png`.replace(' ', '-'),
    groupStageName: 'H',
  },
  {
    name: QatarTeams.SPAIN,
    image: `${QatarTeams.SPAIN}.png`.replace(' ', '-'),
    groupStageName: 'E',
  },
  {
    name: QatarTeams.SWITZERLAND,
    image: `${QatarTeams.SWITZERLAND}.png`.replace(' ', '-'),
    groupStageName: 'G',
  },
  {
    name: QatarTeams.TUNISIA,
    image: `${QatarTeams.TUNISIA}.png`.replace(' ', '-'),
    groupStageName: 'D',
  },
  {
    name: QatarTeams.URUGUAY,
    image: `${QatarTeams.URUGUAY}.png`.replace(' ', '-'),
    groupStageName: 'H',
  },
  {
    name: QatarTeams.USA,
    image: `${QatarTeams.USA}.png`.replace(' ', '-'),
    groupStageName: 'B',
  },
  {
    name: QatarTeams.WALES,
    image: `${QatarTeams.WALES}.png`.replace(' ', '-'),
    groupStageName: 'B',
  },
];

export const matchesData: IMatch[] = [
  {
    local: QatarTeams.SENEGAL,
    visit: QatarTeams.NETHERLANDS,

    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 21, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.QATAR,
    visit: QatarTeams.ECUADOR,

    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 21, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.QATAR,
    visit: QatarTeams.SENEGAL,

    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 25, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.NETHERLANDS,
    visit: QatarTeams.ECUADOR,

    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 25, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.NETHERLANDS,
    visit: QatarTeams.QATAR,

    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 29, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.ECUADOR,
    visit: QatarTeams.SENEGAL,

    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 29, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.ENGLAND,
    visit: QatarTeams.IRAN,

    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 21, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.USA,
    visit: QatarTeams.WALES,

    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 21, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.WALES,
    visit: QatarTeams.IRAN,

    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 25, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.ENGLAND,
    visit: QatarTeams.USA,

    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 25, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.WALES,
    visit: QatarTeams.ENGLAND,

    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 29, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.IRAN,
    visit: QatarTeams.USA,

    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 29, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.ARGENTINA,
    visit: QatarTeams.SAUDI_ARABIA,

    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 22, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.MEXICO,
    visit: QatarTeams.POLAND,

    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 22, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.POLAND,
    visit: QatarTeams.SAUDI_ARABIA,

    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 26, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.ARGENTINA,
    visit: QatarTeams.MEXICO,

    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 26, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.POLAND,
    visit: QatarTeams.ARGENTINA,

    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 30, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.SAUDI_ARABIA,
    visit: QatarTeams.MEXICO,

    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 30, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.DENMARK,
    visit: QatarTeams.TUNISIA,

    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 22, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.FRANCE,
    visit: QatarTeams.AUSTRALIA,

    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 22, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.TUNISIA,
    visit: QatarTeams.AUSTRALIA,

    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 26, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.FRANCE,
    visit: QatarTeams.DENMARK,

    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 26, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.TUNISIA,
    visit: QatarTeams.FRANCE,

    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 30, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.AUSTRALIA,
    visit: QatarTeams.DENMARK,

    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 30, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.GERMANY,
    visit: QatarTeams.JAPAN,

    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 23, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.SPAIN,
    visit: QatarTeams.COSTA_RICA,

    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 23, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.JAPAN,
    visit: QatarTeams.COSTA_RICA,

    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 27, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.SPAIN,
    visit: QatarTeams.GERMANY,

    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 27, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.JAPAN,
    visit: QatarTeams.SPAIN,

    groupStageName: 'E',
    startAt: DateTime.utc(2022, 11, 1, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.COSTA_RICA,
    visit: QatarTeams.GERMANY,

    groupStageName: 'E',
    startAt: DateTime.utc(2022, 11, 1, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.MOROCCO,
    visit: QatarTeams.CROATIA,

    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 23, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.BELGIUM,
    visit: QatarTeams.CANADA,

    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 23, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.BELGIUM,
    visit: QatarTeams.MOROCCO,

    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 27, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.CROATIA,
    visit: QatarTeams.CANADA,

    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 27, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.CROATIA,
    visit: QatarTeams.BELGIUM,

    groupStageName: 'F',
    startAt: DateTime.utc(2022, 11, 1, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.CANADA,
    visit: QatarTeams.MOROCCO,

    groupStageName: 'F',
    startAt: DateTime.utc(2022, 11, 1, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.SWITZERLAND,
    visit: QatarTeams.CAMEROON,

    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 24, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.BRAZIL,
    visit: QatarTeams.SERBIA,

    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 24, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.CAMEROON,
    visit: QatarTeams.SERBIA,

    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 28, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.BRAZIL,
    visit: QatarTeams.SWITZERLAND,

    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 28, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.CAMEROON,
    visit: QatarTeams.BRAZIL,

    groupStageName: 'G',
    startAt: DateTime.utc(2022, 11, 2, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.SERBIA,
    visit: QatarTeams.SWITZERLAND,

    groupStageName: 'G',
    startAt: DateTime.utc(2022, 11, 2, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.URUGUAY,
    visit: QatarTeams.SOUTH_KOREA,

    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 24, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.PORTUGAL,
    visit: QatarTeams.GHANA,

    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 24, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.SOUTH_KOREA,
    visit: QatarTeams.GHANA,

    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 28, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.PORTUGAL,
    visit: QatarTeams.URUGUAY,

    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 28, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.SOUTH_KOREA,
    visit: QatarTeams.PORTUGAL,

    groupStageName: 'H',
    startAt: DateTime.utc(2022, 11, 2, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.GHANA,
    visit: QatarTeams.URUGUAY,
    groupStageName: 'H',
    startAt: DateTime.utc(2022, 11, 2, 15, 0, 0),
    journey: 3,
  },

  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1A',
    visitCondition: '2B',
    startAt: DateTime.utc(2022, 11, 3, 15, 0, 0),
  },
  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1C',
    visitCondition: '2D',
    startAt: DateTime.utc(2022, 11, 3, 19, 0, 0),
  },
  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1D',
    visitCondition: '2C',
    startAt: DateTime.utc(2022, 11, 4, 15, 0, 0),
  },
  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1B',
    visitCondition: '2A',
    startAt: DateTime.utc(2022, 11, 4, 19, 0, 0),
  },
  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1E',
    visitCondition: '2F',
    startAt: DateTime.utc(2022, 11, 5, 15, 0, 0),
  },
  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1G',
    visitCondition: '2H',
    startAt: DateTime.utc(2022, 11, 5, 19, 0, 0),
  },
  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1F',
    visitCondition: '2E',
    startAt: DateTime.utc(2022, 11, 6, 15, 0, 0),
  },
  {
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1H',
    visitCondition: '2G',
    startAt: DateTime.utc(2022, 11, 6, 19, 0, 0),
  },
  {
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1E/2F',
    visitCondition: '1G/2H',
    startAt: DateTime.utc(2022, 11, 9, 15, 0, 0),
  },
  {
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1A/2B',
    visitCondition: '1C/2D',
    startAt: DateTime.utc(2022, 11, 9, 19, 0, 0),
  },
  {
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1F/2E',
    visitCondition: '1H/2G',
    startAt: DateTime.utc(2022, 11, 10, 15, 0, 0),
  },
  {
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1B/2A',
    visitCondition: '1D/2C',
    startAt: DateTime.utc(2022, 11, 10, 19, 0, 0),
  },
  {
    phase: PhaseOptions.SEMI_FINAL,
    localCondition: '1A/2B-1C/2D',
    visitCondition: '1E/2F-1G/2H',
    startAt: DateTime.utc(2022, 11, 13, 19, 0, 0),
  },
  {
    phase: PhaseOptions.SEMI_FINAL,
    localCondition: '1B/2A-1D/2C',
    visitCondition: '1F/2E-1H/2G',
    startAt: DateTime.utc(2022, 11, 14, 19, 0, 0),
  },
  {
    phase: PhaseOptions.THITD_AND_FOURTH,
    localCondition: 'semi final looser',
    visitCondition: 'semi final looser',
    startAt: DateTime.utc(2022, 11, 17, 15, 0, 0),
  },
  {
    phase: PhaseOptions.FINAL,
    localCondition: 'semi final winner',
    visitCondition: 'semi final winner',
    startAt: DateTime.utc(2022, 11, 18, 15, 0, 0),
  },
];
