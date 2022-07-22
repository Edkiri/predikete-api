import { PhaseOptions } from 'src/tournaments/entities/phase.entity';
import { IGroupStage } from 'src/tournaments/models/group-stage.interface';
import { IPhase } from 'src/tournaments/models/phase.interface';
import { QatarTeams } from '../teams/qatarTeamsEnum';

export const phases: IPhase[] = [
  { phase: PhaseOptions.EIGHTH_FINAL },
  { phase: PhaseOptions.QUARTERS_FINAL },
  { phase: PhaseOptions.SEMI_FINAL },
  { phase: PhaseOptions.THITD_AND_FOURTH },
  { phase: PhaseOptions.FINAL },
];

export const groupStages: IGroupStage[] = [
  {
    name: 'A',
    teams: [
      { name: QatarTeams.QATAR },
      { name: QatarTeams.ECUADOR },
      { name: QatarTeams.SENEGAL },
      { name: QatarTeams.NETHERLANDS },
    ],
  },
  {
    name: 'B',
    teams: [
      { name: QatarTeams.ENGLAND },
      { name: QatarTeams.IRAN },
      { name: QatarTeams.USA },
      { name: QatarTeams.WALES },
    ],
  },
  {
    name: 'C',
    teams: [
      { name: QatarTeams.ARGENTINA },
      { name: QatarTeams.SAUDI_ARABIA },
      { name: QatarTeams.MEXICO },
      { name: QatarTeams.POLAND },
    ],
  },
  {
    name: 'D',
    teams: [
      { name: QatarTeams.FRANCE },
      { name: QatarTeams.AUSTRALIA },
      { name: QatarTeams.DENMARK },
      { name: QatarTeams.TUNISIA },
    ],
  },
  {
    name: 'E',
    teams: [
      { name: QatarTeams.SPAIN },
      { name: QatarTeams.COSTA_RICA },
      { name: QatarTeams.GERMANY },
      { name: QatarTeams.JAPAN },
    ],
  },
  {
    name: 'F',
    teams: [
      { name: QatarTeams.BELGIUM },
      { name: QatarTeams.CANADA },
      { name: QatarTeams.MOROCCO },
      { name: QatarTeams.CROATIA },
    ],
  },
  {
    name: 'G',
    teams: [
      { name: QatarTeams.BRAZIL },
      { name: QatarTeams.SERBIA },
      { name: QatarTeams.SWITZERLAND },
      { name: QatarTeams.CAMEROON },
    ],
  },
  {
    name: 'H',
    teams: [
      { name: QatarTeams.PORTUGAL },
      { name: QatarTeams.GHANA },
      { name: QatarTeams.URUGUAY },
      { name: QatarTeams.SOUTH_KOREA },
    ],
  },
];
