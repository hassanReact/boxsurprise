import User from "../models/User";

export const getReferralTree = async (userIds: any[], depth: number): Promise<any[]> => {
    if (depth === 0 || !userIds.length) return [];
  
    const users = await Promise.all(
      userIds.map(async (id) => await User.findById(id))
    );
  
    return await Promise.all(
      users.map(async (user) => {
        const childReferrals = await getReferralTree(user?.directReferrals || [], depth - 1);
        return {
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          directReferrals: childReferrals,
        };
      })
    );
  };
  