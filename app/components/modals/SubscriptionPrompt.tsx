import { textStyles } from '../../config/styles';
import Button from '../Button';
import Prompt from './Prompt';

type Prop = {
  show: boolean;
  subscribe: () => void;
  close: () => void;
};

const description =
  'Lörem ipsum besk tett eurodektig koner. Kontratiligen oling doligen.koner. Kontratiligen oling doligen. ';

const SubscriptionPrompt: React.FC<Prop> = ({ show, close, subscribe }) => {
  return (
    <Prompt
      show={show}
      title="Continue Listening?"
      description={description}
      close={close}
      PositiveBtn={
        <Button
          title="Subscribe"
          buttonStyle={{
            backgroundColor: '#0E4F73',
            paddingHorizontal: 32,
            paddingVertical: 12,
            borderRadius: 49,
          }}
          onPress={subscribe}
          textStyle={[textStyles.mediumButton]}
        />
      }
      NegativeBtn={
        <Button
          title="No"
          buttonStyle={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            marginRight: 16,
          }}
          textStyle={[textStyles.mediumButton, { color: '#000' }]}
          onPress={close}
        />
      }
    />
  );
};

export default SubscriptionPrompt;
