import { PhaseOptions } from 'src/tournaments/entities/phase.entity';
import { IMatch } from 'src/tournaments/models/match.interface';
import { DateTime } from 'luxon';
import { QatarTeams } from '../teams/qatarTeamsEnum';

export const matches: IMatch[] = [
  {
    local: QatarTeams.SENEGAL,
    visit: QatarTeams.NETHERLANDS,
    // goalsLocal: 1,
    // goalsVisit: 1,
    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 21, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.QATAR,
    visit: QatarTeams.ECUADOR,
    // goalsLocal: 0,
    // goalsVisit: 0,
    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 21, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.QATAR,
    visit: QatarTeams.SENEGAL,
    // goalsLocal: 2,
    // goalsVisit: 0,
    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 25, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.NETHERLANDS,
    visit: QatarTeams.ECUADOR,
    // goalsLocal: 1,
    // goalsVisit: 0,
    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 25, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.NETHERLANDS,
    visit: QatarTeams.QATAR,
    // goalsLocal: 1,
    // goalsVisit: 1,
    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 29, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.ECUADOR,
    visit: QatarTeams.SENEGAL,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'A',
    startAt: DateTime.utc(2022, 10, 29, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.ENGLAND,
    visit: QatarTeams.IRAN,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 21, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.USA,
    visit: QatarTeams.WALES,
    // goalsLocal: 4,
    // goalsVisit: 0,
    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 21, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.WALES,
    visit: QatarTeams.IRAN,
    // goalsLocal: 2,
    // goalsVisit: 0,
    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 25, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.ENGLAND,
    visit: QatarTeams.USA,
    // goalsLocal: 1,
    // goalsVisit: 0,
    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 25, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.WALES,
    visit: QatarTeams.ENGLAND,
    // goalsLocal: 1,
    // goalsVisit: 1,
    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 29, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.IRAN,
    visit: QatarTeams.USA,
    // goalsLocal: 1,
    // goalsVisit: 1,
    groupStageName: 'B',
    startAt: DateTime.utc(2022, 10, 29, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.ARGENTINA,
    visit: QatarTeams.SAUDI_ARABIA,
    // goalsLocal: 0,
    // goalsVisit: 0,
    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 22, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.MEXICO,
    visit: QatarTeams.POLAND,
    // goalsLocal: 2,
    // goalsVisit: 1,
    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 22, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.POLAND,
    visit: QatarTeams.SAUDI_ARABIA,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 26, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.ARGENTINA,
    visit: QatarTeams.MEXICO,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 26, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.POLAND,
    visit: QatarTeams.ARGENTINA,
    // goalsLocal: 0,
    // goalsVisit: 3,
    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 30, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.SAUDI_ARABIA,
    visit: QatarTeams.MEXICO,
    // goalsLocal: 4,
    // goalsVisit: 1,
    groupStageName: 'C',
    startAt: DateTime.utc(2022, 10, 30, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.DENMARK,
    visit: QatarTeams.TUNISIA,
    // goalsLocal: 2,
    // goalsVisit: 1,
    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 22, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.FRANCE,
    visit: QatarTeams.AUSTRALIA,
    // goalsLocal: 0,
    // goalsVisit: 2,
    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 22, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.TUNISIA,
    visit: QatarTeams.AUSTRALIA,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 26, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.FRANCE,
    visit: QatarTeams.DENMARK,
    // goalsLocal: 2,
    // goalsVisit: 2,
    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 26, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.TUNISIA,
    visit: QatarTeams.FRANCE,
    // goalsLocal: 0,
    // goalsVisit: 0,
    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 30, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.AUSTRALIA,
    visit: QatarTeams.DENMARK,
    // goalsLocal: 1,
    // goalsVisit: 0,
    groupStageName: 'D',
    startAt: DateTime.utc(2022, 10, 30, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.GERMANY,
    visit: QatarTeams.JAPAN,
    // goalsLocal: 1,
    // goalsVisit: 1,
    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 23, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.SPAIN,
    visit: QatarTeams.COSTA_RICA,
    // goalsLocal: 1,
    // goalsVisit: 2,
    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 23, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.JAPAN,
    visit: QatarTeams.COSTA_RICA,
    // goalsLocal: 0,
    // goalsVisit: 2,
    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 27, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.SPAIN,
    visit: QatarTeams.GERMANY,
    // goalsLocal: 1,
    // goalsVisit: 1,
    groupStageName: 'E',
    startAt: DateTime.utc(2022, 10, 27, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.JAPAN,
    visit: QatarTeams.SPAIN,
    // goalsLocal: 3,
    // goalsVisit: 1,
    groupStageName: 'E',
    startAt: DateTime.utc(2022, 11, 1, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.COSTA_RICA,
    visit: QatarTeams.GERMANY,
    // goalsLocal: 7,
    // goalsVisit: 0,
    groupStageName: 'E',
    startAt: DateTime.utc(2022, 11, 1, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.MOROCCO,
    visit: QatarTeams.CROATIA,
    // goalsLocal: 1,
    // goalsVisit: 0,
    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 23, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.BELGIUM,
    visit: QatarTeams.CANADA,
    // goalsLocal: 2,
    // goalsVisit: 0,
    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 23, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.BELGIUM,
    visit: QatarTeams.MOROCCO,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 27, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.CROATIA,
    visit: QatarTeams.CANADA,
    // goalsLocal: 1,
    // goalsVisit: 2,
    groupStageName: 'F',
    startAt: DateTime.utc(2022, 10, 27, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.CROATIA,
    visit: QatarTeams.BELGIUM,
    // goalsLocal: 2,
    // goalsVisit: 2,
    groupStageName: 'F',
    startAt: DateTime.utc(2022, 11, 1, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.CANADA,
    visit: QatarTeams.MOROCCO,
    // goalsLocal: 0,
    // goalsVisit: 2,
    groupStageName: 'F',
    startAt: DateTime.utc(2022, 11, 1, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.SWITZERLAND,
    visit: QatarTeams.CAMEROON,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 24, 10, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.BRAZIL,
    visit: QatarTeams.SERBIA,
    // goalsLocal: 1,
    // goalsVisit: 0,
    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 24, 19, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.CAMEROON,
    visit: QatarTeams.SERBIA,
    // goalsLocal: 0,
    // goalsVisit: 1,
    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 28, 10, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.BRAZIL,
    visit: QatarTeams.SWITZERLAND,
    // goalsLocal: 2,
    // goalsVisit: 1,
    groupStageName: 'G',
    startAt: DateTime.utc(2022, 10, 28, 16, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.CAMEROON,
    visit: QatarTeams.BRAZIL,
    // goalsLocal: 3,
    // goalsVisit: 2,
    groupStageName: 'G',
    startAt: DateTime.utc(2022, 11, 2, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.SERBIA,
    visit: QatarTeams.SWITZERLAND,
    // goalsLocal: 0,
    // goalsVisit: 0,
    groupStageName: 'G',
    startAt: DateTime.utc(2022, 11, 2, 19, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.URUGUAY,
    visit: QatarTeams.SOUTH_KOREA,
    // goalsLocal: 1,
    // goalsVisit: 3,
    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 24, 13, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.PORTUGAL,
    visit: QatarTeams.GHANA,
    // goalsLocal: 1,
    // goalsVisit: 2,
    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 24, 16, 0, 0),
    journey: 1,
  },
  {
    local: QatarTeams.SOUTH_KOREA,
    visit: QatarTeams.GHANA,
    // goalsLocal: 0,
    // goalsVisit: 0,
    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 28, 13, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.PORTUGAL,
    visit: QatarTeams.URUGUAY,
    // goalsLocal: 0,
    // goalsVisit: 3,
    groupStageName: 'H',
    startAt: DateTime.utc(2022, 10, 28, 19, 0, 0),
    journey: 2,
  },
  {
    local: QatarTeams.SOUTH_KOREA,
    visit: QatarTeams.PORTUGAL,
    // goalsLocal: 1,
    // goalsVisit: 2,
    groupStageName: 'H',
    startAt: DateTime.utc(2022, 11, 2, 15, 0, 0),
    journey: 3,
  },
  {
    local: QatarTeams.GHANA,
    visit: QatarTeams.URUGUAY,
    // goalsLocal: 0,
    // goalsVisit: 0,
    groupStageName: 'H',
    startAt: DateTime.utc(2022, 11, 2, 15, 0, 0),
    journey: 3,
  },
];

export const final_matches: IMatch[] = [
  // Final Phase
  {
    // local: 'Uruguay',
    // visit: 'Republic of Korea',
    // goalsLocal: 2,
    // goalsVisit: 1,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1A',
    visitCondition: '2B',
    startAt: DateTime.utc(2022, 11, 3, 15, 0, 0),
  },
  {
    // local: 'USA',
    // visit: 'Ghana',
    // goalsLocal: 1,
    // goalsVisit: 2,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1C',
    visitCondition: '2D',
    startAt: DateTime.utc(2022, 11, 3, 19, 0, 0),
  },
  {
    // local: 'Argentina',
    // visit: 'Mexico',
    // goalsLocal: 3,
    // goalsVisit: 1,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1D',
    visitCondition: '2C',
    startAt: DateTime.utc(2022, 11, 4, 15, 0, 0),
  },
  {
    // local: 'Germany',
    // visit: 'England',
    // goalsLocal: 4,
    // goalsVisit: 1,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1B',
    visitCondition: '2A',
    startAt: DateTime.utc(2022, 11, 4, 19, 0, 0),
  },
  {
    // local: 'Netherlans',
    // visit: 'Slovakia',
    // goalsLocal: 2,
    // goalsVisit: 1,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1E',
    visitCondition: '2F',
    startAt: DateTime.utc(2022, 11, 5, 15, 0, 0),
  },
  {
    // local: 'Brasil',
    // visit: 'Chile',
    // goalsLocal: 3,
    // goalsVisit: 0,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1G',
    visitCondition: '2H',
    startAt: DateTime.utc(2022, 11, 5, 19, 0, 0),
  },
  {
    // local: 'Paraguay',
    // visit: 'Japan',
    // goalsLocal: 0,
    // goalsVisit: 0,
    // penalsLocal: 5,
    // penalsVisit: 3,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1F',
    visitCondition: '2E',
    startAt: DateTime.utc(2022, 11, 6, 15, 0, 0),
  },
  {
    // local: 'Spain',
    // visit: 'Portugal',
    // goalsLocal: 1,
    // goalsVisit: 0,
    phase: PhaseOptions.EIGHTH_FINAL,
    localCondition: '1H',
    visitCondition: '2G',
    startAt: DateTime.utc(2022, 11, 6, 19, 0, 0),
  },
  {
    // local: 'Uruguay',
    // visit: 'Ghana',
    // goalsLocal: 1,
    // goalsVisit: 1,
    // penalsLocal: 4,
    // penalsVisit: 2,
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1E/2F',
    visitCondition: '1G/2H',
    startAt: DateTime.utc(2022, 11, 9, 15, 0, 0),
  },
  {
    // local: 'Netherlans',
    // visit: 'Brasil',
    // goalsLocal: 2,
    // goalsVisit: 1,
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1A/2B',
    visitCondition: '1C/2D',
    startAt: DateTime.utc(2022, 11, 9, 19, 0, 0),
  },
  {
    // local: 'Argentina',
    // visit: 'Germany',
    // goalsLocal: 0,
    // goalsVisit: 4,
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1F/2E',
    visitCondition: '1H/2G',
    startAt: DateTime.utc(2022, 11, 10, 15, 0, 0),
  },
  {
    // local: 'Paraguay',
    // visit: 'Spain',
    // goalsLocal: 0,
    // goalsVisit: 1,
    phase: PhaseOptions.QUARTERS_FINAL,
    localCondition: '1B/2A',
    visitCondition: '1D/2C',
    startAt: DateTime.utc(2022, 11, 10, 19, 0, 0),
  },
  {
    // local: 'Uruguay',
    // visit: 'Netherlans',
    // goalsLocal: 2,
    // goalsVisit: 3,
    phase: PhaseOptions.SEMI_FINAL,
    localCondition: '1A/2B-1C/2D',
    visitCondition: '1E/2F-1G/2H',
    startAt: DateTime.utc(2022, 11, 13, 19, 0, 0),
  },
  {
    // local: 'Germany',
    // visit: 'Spain',
    // goalsLocal: 0,
    // goalsVisit: 1,
    phase: PhaseOptions.SEMI_FINAL,
    localCondition: '1B/2A-1D/2C',
    visitCondition: '1F/2E-1H/2G',
    startAt: DateTime.utc(2022, 11, 14, 19, 0, 0),
  },
  {
    // local: 'Uruguay',
    // visit: 'Germany',
    // goalsLocal: 2,
    // goalsVisit: 3,
    phase: PhaseOptions.THITD_AND_FOURTH,
    localCondition: 'semi final looser',
    visitCondition: 'semi final looser',
    startAt: DateTime.utc(2022, 11, 17, 15, 0, 0),
  },
  {
    // local: 'Netherlans',
    // visit: 'Spain',
    // goalsLocal: 0,
    // goalsVisit: 1,
    phase: PhaseOptions.FINAL,
    localCondition: 'semi final winner',
    visitCondition: 'semi final winner',
    startAt: DateTime.utc(2022, 11, 18, 15, 0, 0),
  },
];
