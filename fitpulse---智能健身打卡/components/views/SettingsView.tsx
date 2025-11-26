import React, { useState, useEffect } from 'react';
import { Bell, Shield, Info, LogOut } from 'lucide-react';

const SettingsView: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestNotification = async () => {
    if (!('Notification' in window)) {
      alert("此浏览器不支持通知功能");
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      new Notification("FitPulse 通知已开启", {
        body: "我们将会在每天提醒你保持健康！"
      });
    }
  };

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto no-scrollbar">
      <h2 className="text-xl font-bold text-gray-900 mb-6">设置</h2>

      <div className="space-y-4">
        {/* Notification Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                 <Bell size={20} />
              </div>
              <div>
                 <h3 className="font-bold text-gray-800">每日提醒</h3>
                 <p className="text-xs text-gray-500">不再错过任何一次训练</p>
              </div>
           </div>
           
           <div className="mt-4 flex justify-between items-center bg-gray-50 p-3 rounded-xl">
              <span className="text-sm text-gray-600">通知权限</span>
              <button 
                onClick={requestNotification}
                disabled={permission === 'granted'}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                   permission === 'granted' 
                   ? 'bg-green-100 text-green-600 border border-green-200' 
                   : 'bg-indigo-600 text-white shadow-md'
                }`}
              >
                {permission === 'granted' ? '已开启' : permission === 'denied' ? '已拒绝' : '开启'}
              </button>
           </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <button className="w-full flex items-center justify-between group">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <Shield size={20} />
                    </div>
                    <span className="font-medium text-gray-700">隐私政策</span>
                </div>
            </button>
            <div className="h-px bg-gray-50"></div>
            <button className="w-full flex items-center justify-between group">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                        <Info size={20} />
                    </div>
                    <span className="font-medium text-gray-700">关于 FitPulse</span>
                </div>
                <span className="text-xs text-gray-400">v1.0.0</span>
            </button>
        </div>
        
        <button 
            className="w-full mt-8 p-4 rounded-2xl border border-red-100 text-red-500 font-medium bg-white flex items-center justify-center gap-2 hover:bg-red-50 transition"
            onClick={() => {
                if(confirm('确定要清除所有本地数据吗？')) {
                    localStorage.clear();
                    window.location.reload();
                }
            }}
        >
            <LogOut size={18} />
            清除数据并重置
        </button>
      </div>
    </div>
  );
};

export default SettingsView;