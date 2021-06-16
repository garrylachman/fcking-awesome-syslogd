//
//  RCTSyslogModule.m
//  fckingawesomesyslogd-macOS
//
//  Created by Dr G on 22/05/2021.
//

#import "RCTSyslogModule.h"
#import "ISUdpConnection.h"
#import <netdb.h>

@implementation RCTSyslogModule {
  BOOL _hasListeners;
  int _bindPort;
  ISUdpConnection *_udpConnection;
};

RCT_EXPORT_MODULE(SyslogModule);

RCT_EXPORT_METHOD(setPort:(int)port)
{
  _bindPort = port;
}

RCT_EXPORT_METHOD(startServer)
{
  if (_udpConnection != NULL) {
    [_udpConnection close];
    _udpConnection = NULL;
  }
  
  _udpConnection = [[ISUdpConnection alloc] initWithPort:_bindPort];
  _udpConnection.logLineHandler = ^ (NSString *addr, NSNumber *port, NSString *line) {
    int _severity;
    int _facility;
    {
        NSRange lt, gt;
        
        lt = [line rangeOfString:@"<"];
        gt = [line rangeOfString:@">"];
        
        if (NSNotFound == lt.location || NSNotFound == gt.location)
          return;
        
        NSUInteger props = [line substringWithRange:NSMakeRange(lt.location+1, gt.location-lt.location-1)].integerValue;
        
        _severity = (props & 0x7);
        _facility = (props & 0xF8) >> 3;
        
        //DLog(@"     severity=%d, facility=%d", (int)_severity, (int)_facility);
        
        line = [line substringFromIndex:gt.location + 1];
      }
    
    RCTLog(@"[severity=%d, facility=%d] %@:%@ = %@", _severity, _facility, addr, port, line);
    
    if (_hasListeners) {
      [self
       sendEventWithName:@"onMessage"
       body:@{ @"severity": @(_severity), @"facility": @(_facility), @"addr": addr, @"port": port, @"msg": line }
      ];
    }
  };
}

RCT_EXPORT_METHOD(stopServer)
{
  if (_udpConnection != NULL) {
    [_udpConnection close];
    _udpConnection = NULL;
  }
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"onMessage"];
}

- (void)startObserving
{
  _hasListeners = YES;
}

- (void)stopObserving
{
  _hasListeners = NO;
}

@end
