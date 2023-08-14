import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAuth from '../auth/useAuth';
import routes from '../navigation/routes';
import ScreenWithToolbar from '../components/ScreenWithToolbar';
import { useApi } from '../hooks/useApi';
import { getPlan } from '../api/paystack';
import colors from '../config/colors';
import { textStyles } from '../config/styles';
import { format } from 'date-fns';
import MediumButton from '../components/MediumButton';
import { cancelSubscription } from '../api/user';
import { CancelToken } from 'apisauce';

type Prop = NativeStackScreenProps<any>;

const SubscriptionDetailsScreen: React.FC<Prop> = ({ navigation }) => {
  const { user, login } = useAuth();
  const { request, loading, data } = useApi<any>(getPlan);
  const { request: cancelRequest, loading: cancelLoading } =
    useApi(cancelSubscription);

  const handleSubmit = async () => {
    const res = await cancelRequest();
    if (res.ok) {
      login(res.data.data.token);
    }
  };

  useEffect(() => {
    const cancelToken = CancelToken.source();
    request(cancelToken);
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <>
      {user?.subscribed ? (
        <ScreenWithToolbar iconTint="#0E4F73">
          {loading ? (
            <ActivityIndicator
              size="large"
              color={colors.light_blue}
              style={styles.loading}
            />
          ) : null}
          {data ? (
            <View style={[styles.container, { gap: 20 }]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={textStyles.heading2}>Plan</Text>
                <Text
                  style={[
                    textStyles.heading3,
                    { color: '#C4C4C4', textTransform: 'capitalize' },
                  ]}
                >
                  {data.interval}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={textStyles.heading2}>Cost</Text>
                <Text
                  style={[
                    textStyles.heading3,
                    { color: '#C4C4C4', textTransform: 'capitalize' },
                  ]}
                >
                  {data.amount}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={textStyles.heading2}>Status</Text>
                <Text
                  style={[
                    textStyles.heading3,
                    { color: '#C4C4C4', textTransform: 'capitalize' },
                  ]}
                >
                  {user.subscription_status ? 'Active' : 'Cancelled'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={textStyles.heading2}>Renewal Date</Text>
                <Text
                  style={[
                    textStyles.heading3,
                    { color: '#C4C4C4', textTransform: 'capitalize' },
                  ]}
                >
                  {format(new Date(user?.renewal_date || ''), 'dd-MM-yyyy')}
                </Text>
              </View>
              {user.subscription_status ? (
                <MediumButton
                  title={'Cancel Subscription'}
                  onPress={handleSubmit}
                  backgroundColor="#0E4F73"
                />
              ) : null}
              {cancelLoading ? (
                <ActivityIndicator
                  size="small"
                  color={colors.light_blue}
                  style={styles.loading}
                />
              ) : null}
            </View>
          ) : null}
        </ScreenWithToolbar>
      ) : (
        navigation.replace(routes.PAYMENT_INFO)
      )}
    </>
  );
};

export default SubscriptionDetailsScreen;

const styles = StyleSheet.create({
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
  container: {
    paddingHorizontal: 40,
    position: 'relative',
    marginTop: 30,
  },
});
