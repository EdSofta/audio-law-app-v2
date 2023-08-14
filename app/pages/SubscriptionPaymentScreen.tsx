import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenWithToolbar from '../components/ScreenWithToolbar';
import { textStyles } from '../config/styles';
import { Feather } from '@expo/vector-icons';
import PlanItem from '../components/PlanItem';
import Divider from '../components/Divider';
import { useApi } from '../hooks/useApi';
import {
  getCustomer,
  getPlans,
  initiateSubApi,
  PaystackPlan,
} from '../api/paystack';
import { CancelToken } from 'apisauce';
import colors from '../config/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import routes from '../navigation/routes';
import Toast from 'react-native-root-toast';
import useAuth from '../auth/useAuth';
import { checkSubscription } from '../api/user';
import { AuthContextType, AuthContext } from '../auth/context';

type Prop = NativeStackScreenProps<any>;

const SubscriptionPaymentScreen: React.FC<Prop> = ({ navigation }) => {
  const { user, login } = useAuth();

  const { request, error, loading } = useApi(initiateSubApi);
  const {
    request: checkSubscriptionRequest,
    data: userData,
    loading: checkLoading,
  } = useApi(checkSubscription);

  const {
    request: requestPlans,
    loading: plansLoading,
    data: plans,
  } = useApi<any>(getPlans);

  const { request: requestCustomer, loading: customerLoading } =
    useApi<any>(getCustomer);

  const [selectedPlanId, setSelectedPlanId] = useState<string>();

  let cancelToken = CancelToken.source();

  const makingRequest = useMemo(
    () => loading || plansLoading || checkLoading || customerLoading,
    [loading, plansLoading, checkLoading, customerLoading]
  );

  useEffect(() => {
    navigation.addListener('focus', () => {
      requestCustomer().then((res) => {
        if (res.ok) {
          const customer_id = res.data?.data.id;
          checkSubscriptionRequest({ customer_id, plan_id: selectedPlanId });
        } else {
          requestPlans();
        }
      });
    });
  }, []);

  const handleOnPress = (plan: PaystackPlan) => {
    cancelToken.cancel();
    cancelToken = CancelToken.source();
    setSelectedPlanId(plan.id);
    console.log(plan);
    request(plan.plan_code, cancelToken).then(({ ok, data: resp }) => {
      if (ok) {
        if (resp.data?.authorization_url) {
          navigation.push(routes.WEBVIEW, { url: resp.data.authorization_url });
        }
      } else {
        Toast.show(resp.data?.message, {
          hideOnPress: true,
          backgroundColor: colors.red,
          textColor: colors.white,
          animation: true,
          duration: 4000,
        });
      }
    });
  };

  useEffect(() => {
    if (userData) {
      login((userData as any).token).then(() => navigation.goBack());
    }
  }, [userData]);

  return (
    <ScreenWithToolbar iconTint="#0E4F73">
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.title}>Choose the best plan {'\n'} for you</Text>
        <Text style={style.subtitle}>
          Lörem ipsum nyrar digt diabågon med titirade. Prena kore: ett popredat
          respektive pneumaitet.
        </Text>
        <Text style={[textStyles.body, { fontFamily: 'Montserrat_Semi_Bold' }]}>
          Includes:
        </Text>
        <View style={style.listItem}>
          <Feather name="check" size={20} style={{ marginRight: 10 }} />
          <Text style={textStyles.body}>No commitments, cancel anytime.</Text>
        </View>
        <View style={style.listItem}>
          <Feather name="check" size={20} style={{ marginRight: 10 }} />
          <Text style={textStyles.body}>
            Free play and Recommendations for you.
          </Text>
        </View>
        <View style={style.listItem}>
          <Feather name="check" size={20} style={{ marginRight: 10 }} />
          <Text style={textStyles.body}>No ads and no extra fees.</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          {plans?.map((plan: PaystackPlan) => (
            <View key={plan.plan_code}>
              <PlanItem plan={plan} onPress={handleOnPress} />
              <Divider height={20} color="transparent" />
            </View>
          ))}
        </View>
      </ScrollView>
      {makingRequest ? (
        <ActivityIndicator
          size="large"
          color={colors.light_blue}
          style={style.loading}
        />
      ) : null}
    </ScreenWithToolbar>
  );
};

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    position: 'relative',
  },
  loading: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 20,
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
    elevation: 20,
  },
  title: {
    ...textStyles.heading3,
    color: '#555555',
    marginTop: 30,
    textAlign: 'center',
  },
  subtitle: {
    ...textStyles.body,
    color: '#555555',
    marginTop: 10,
    marginBottom: 30,
    maxWidth: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  listItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SubscriptionPaymentScreen;
