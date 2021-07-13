import {setGlobal} from 'reactn';
import moment from 'moment';

setGlobal({
  seasonYear: moment().year(),
});
